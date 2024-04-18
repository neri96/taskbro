import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import ShortUniqueId from "short-unique-id";

import Project from "../models/project.model";
import User from "../models/user.model";
import Chat from "../models/chat.model";
import Notification from "../models/notification.model";

import crypto from "crypto";

import { getFileUrl, addFile, setImgUrl } from "../utils/s3";

export const getOne = async (req: Request, res: Response) => {
  const { id: uid } = req.query;

  try {
    const project = await Project.findOne({ uid }).populate(
      "team",
      "id name nickname image"
    );

    if (project?.team)
      for (const member of project.team) {
        if (member.image) {
          await setImgUrl(member);
        }
      }

    if (project?.files)
      for (const file of project.files) {
        file.fileName = await getFileUrl(file.fileName);
      }

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  const filter = Number(req.query.filter);

  const { id } = jwt.verify(
    req.cookies.token,
    process.env.REFRESH_SECRET_KEY as string
  ) as jwt.JwtPayload;

  try {
    let config: any = {};

    switch (true) {
      case filter === 0:
        config.deadline = { $lt: Date.now() };
        break;
      case filter === 1:
        config.completed = true;
        break;
      case filter === 2:
        config["$or"] = [{ manager: id }, { team: id }];
        break;
    }

    const projects = await Project.find(config)
      .sort({ createdAt: -1 })
      .populate("manager")
      .populate({ path: "team", select: "_id name nickname image" });

    const images: any = {};

    for (let i = 0; i < projects.length; i++) {
      const { team } = projects[i];

      for (let j = 0; j < team.length; j++) {
        const member = team[j];

        const { _id } = member;

        if (images[String(_id)]) {
          member.image = images[_id];
        } else if (member.image) {
          await setImgUrl(member);
          images[_id] = member.image;
        }
      }
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req: Request, res: Response) => {
  const { title, manager, deadline, team, tasks, description } = req.body;

  const uid = new ShortUniqueId({ length: 10 });

  try {
    const newProject = new Project({
      uid: uid.rnd(),
      title,
      manager,
      deadline,
      team,
      tasks,
      description,
    });

    await User.updateMany(
      { _id: { $in: newProject.team } },
      { $push: { projects: newProject._id } }
    );

    const chat = await new Chat({
      members: team,
    }).save();

    newProject.chat = chat._id;

    await new Notification({
      to: [manager],
      message: `You have created a project named ${title}. Let's roll!`,
      readBy: [],
    }).save();

    await new Notification({
      to: newProject.team,
      message: `You have been added to project ${title}`,
      readBy: [],
    }).save();

    await newProject.save();

    return res.status(200).json("Project has been successfully created");
  } catch (error) {
    console.log(error);
  }
};

export const edit = async (req: Request, res: Response) => {
  const { id, title, deadline, description } = req.body;

  try {
    await Project.updateOne(
      { _id: id },
      {
        title,
        deadline,
        description,
      }
    );

    return res.status(200).json("Project has been successfully created");
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { projectId, task } = req.body;

  try {
    await Project.updateOne(
      { _id: projectId },
      {
        $push: { tasks: { task, completed: false } },
      }
    );

    return res.status(200).json("Added new task");
  } catch (error) {
    console.log(error);
  }
};

export const modifyTask = async (req: Request, res: Response) => {
  const { projectId, taskId, isCurrentlyCompleted } = req.body;

  try {
    const data = await Project.findOneAndUpdate(
      { _id: projectId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.completed": !isCurrentlyCompleted,
        },
      },
      { new: true }
    );

    const result = {
      isTaskCompleted: data?.tasks.find(
        (task: { _id: string; completed: boolean }) =>
          String(task._id) === taskId
      )?.completed,
      isFinished: data?.tasks.every(
        (task: { _id: string; completed: boolean }) => task.completed
      ),
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const complete = async (req: Request, res: Response) => {
  const { projectId, isCurrentlyCompleted, cancelAllTasks } = req.body;

  try {
    const config: {
      completed: boolean;
      $set?: { "tasks.$[].completed": boolean };
    } = { completed: !isCurrentlyCompleted };

    if (cancelAllTasks) {
      config["$set"] = {
        "tasks.$[].completed": isCurrentlyCompleted ? false : true,
      };
    }

    const data = await Project.findOneAndUpdate({ _id: projectId }, config, {
      new: true,
    });

    if (data) {
      await new Notification({
        to: data.team,
        message: data.completed
          ? `Congratulations! The project - ${data.title} has been successfully completed`
          : `The project - ${data.title} is active again`,
        readBy: [],
      }).save();

      return res.status(200).json({
        completed: data.completed,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addFiles = async (req: Request, res: Response) => {
  const { projectId } = req.body;

  try {
    if (req.file || req.files) {
      const files: any = req.files;
      const fileNames = [];

      for (const file of files) {
        const origNameArr = file.originalname.split(".");
        const extention = origNameArr[origNameArr.length - 1];

        const fileName =
          "files" + crypto.randomBytes(32).toString("hex") + "." + extention;

        await addFile(fileName, file.buffer, file.mimetype);

        fileNames.push({
          title: file.originalname.replace("." + extention, ""),
          fileName,
          fileType: extention,
        });
      }

      await Project.findByIdAndUpdate(
        { _id: projectId },
        { $push: { files: { $each: fileNames } } }
      );

      return res.status(200).json("Successfully uploaded file");
    }
  } catch (error) {
    console.log(error);
  }
};

export const kickMember = async (req: Request, res: Response) => {
  const { projectId, memberId } = req.body;

  try {
    await Project.updateOne({ _id: projectId }, { $pull: { team: memberId } });
    await User.updateOne({ _id: memberId }, { $pull: { projects: projectId } });

    return res.status(200).json("Successfully kicked out");
  } catch (error) {
    console.log(error);
  }
};
