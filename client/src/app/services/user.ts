import { api } from "./api";

import { IProject } from "./project";

export interface IFav {
  id: string;
  name: string;
  nickname: string;
  image: string;
}

export interface IUser {
  id: string;
  nickname: string;
  name: string;
  job: string;
  bio: string;
  image: string;
  email: string;
  favorites: IFav[];
  projects: IProject;
}

export interface IUserData {
  user: IUser;
  token: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<IUserData, undefined>({
      query() {
        return {
          url: "/user/me",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getUser: build.query<IUser, string>({
      query(nickname) {
        return {
          url: "/user/one",
          method: "GET",
          params: { nickname },
        };
      },
      providesTags: ["User"],
    }),
    edit: build.mutation<
      string,
      { id: string; name?: string; job?: string; bio?: string }
    >({
      query(body) {
        return {
          url: "/user/edit",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    changeImage: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: "/user/image",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    search: build.query<IUser[], string>({
      query(searchName: string) {
        return {
          url: "/user/search",
          method: "GET",
          params: { searchName },
        };
      },
      providesTags: ["User"],
    }),
    modifyFavList: build.mutation<string, { userId: string; favId: string }>({
      query(body) {
        return {
          url: "/user/favmodify",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useGetUserQuery,
  useEditMutation,
  useSearchQuery,
  useLazySearchQuery,
  useChangeImageMutation,
  useModifyFavListMutation,
} = userApi;
