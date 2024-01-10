import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import ShortUniqueId from "short-unique-id";

import Project from "../models/project.model";
import User from "../models/user.model";

import { setImgUrl } from "../utils/s3";

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
