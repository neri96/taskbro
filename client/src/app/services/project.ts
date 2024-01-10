import { api } from "./api";

import { IUser } from "./user";

import { ProjectFilter } from "../../features/projects/projectsSlice";

export interface ITask {
  _id: string;
  task: string;
  completed: boolean;
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
  files: any;
}

export const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const {
  useGetProjectsQuery,
  useProjectCreateMutation,
  useProjectEditMutation,
} = projectApi;
