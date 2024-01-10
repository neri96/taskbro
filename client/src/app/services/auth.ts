import { api } from "./api";

import { IUserData } from "./user";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<
      IUserData,
      { nickname: string; name: string; email: string; password: string }
    >({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<IUserData, { email: string; password: string }>({
      query(body) {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    refresh: build.mutation<IUserData, void>({
      query(body) {
        return {
          url: "/auth/refresh",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    logOut: build.mutation<string, void>({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogOutMutation,
} = authApi;
