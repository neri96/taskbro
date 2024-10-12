import { api } from "./api";

import { IUser } from "./user";

import { ProjectFilter } from "../../features/projects/projectsSlice";

export interface ITask {
  _id: string;
  task: string;
  completed: boolean;
}

export interface IChatData {
  chat?: string;
  from: string;
  isPrivate: boolean;
  to?: string;
}

export interface IFile {
  _id: string;
  title: string;
  fileName: string;
  fileType: string;
}

export interface IProjectInput {
  title: string;
  deadline: number;
  team: string | string[];
  description: string;
  manager: string;
  tasks: { task: string; completed: boolean }[];
}

export interface IProjectEdit {
  id?: string;
  title: string;
  deadline: number;
  description: string;
}

export interface IProjectComplete {
  projectId: string;
  isCurrentlyCompleted: boolean;
  cancelAllTasks: boolean;
}

export interface IProject {
  id: string;
  uid: string;
  title: string;
  description: string;
  deadline: number;
  manager: string;
  team: IUser[];
  tasks: ITask[];
  completed: boolean;
  chat: string;
  createdAt: string;
  updatedAt: string;
  files: IFile[];
}

export const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOneProject: build.query<IProject, string>({
      query(id: string) {
        return {
          url: "/project/one",
          method: "GET",
          params: { id },
        };
      },
      providesTags: ["Project"],
    }),
    getProjects: build.query<IProject[], ProjectFilter>({
      query(filter) {
        return {
          url: "/project/all",
          method: "GET",
          params: { filter },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Project" as const,
                id,
              })),
              "Project",
            ]
          : ["Project"],
    }),
    projectCreate: build.mutation<string, IProjectInput>({
      query(body) {
        return {
          url: "/project/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Project", "Notification"],
    }),
    projectEdit: build.mutation<string, IProjectEdit>({
      query(body) {
        return {
          url: "/project/edit",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Project"],
    }),
    projectComplete: build.mutation<{ completed: boolean }, IProjectComplete>({
      query(body) {
        return {
          url: "/project/complete",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Project", "Notification"],
    }),
    projectTaskAdd: build.mutation<string, { projectId: string; task: string }>(
      {
        query(body) {
          return {
            url: "/project/task-add",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Project"],
      }
    ),
    projectTaskModify: build.mutation<
      { isTaskCompleted: boolean; isFinished: boolean },
      { projectId: string; taskId?: string; isCurrentlyCompleted: boolean }
    >({
      query(body) {
        return {
          url: "/project/task-modify",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Project"],
    }),
    projectFilesAdd: build.mutation<string, { projectId: string; files: any }>({
      query(body) {
        return {
          url: "/project/file-add",
          method: "POST",
          body,
          formData: true,
        };
      },
      invalidatesTags: ["Project"],
    }),
    projectKickMember: build.mutation<
      string,
      { projectId: string; memberId: string }
    >({
      query(body) {
        return {
          url: "/project/kick",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetOneProjectQuery,
  useGetProjectsQuery,
  useProjectCreateMutation,
  useProjectEditMutation,
  useProjectCompleteMutation,
  useProjectTaskAddMutation,
  useProjectTaskModifyMutation,
  useProjectFilesAddMutation,
  useProjectKickMemberMutation,
} = projectApi;
