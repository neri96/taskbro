import { api } from "./api";

export interface INotif {
  id: string;
  to: string[];
  message: string;
  readBy: string[];
  createdAt: string;
}

export const notifApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNotifs: build.query<
      { notifications: INotif[]; notReadQty: number },
      string
    >({
      query(id) {
        return {
          url: "/notification/all",
          method: "GET",
          params: { id },
        };
      },
      providesTags: ["Notification"],
    }),
    readNotifs: build.mutation<
      INotif[],
      { notReadIds: string[]; userId: string }
    >({
      query({ notReadIds, userId }) {
        return {
          url: "/notification/read",
          method: "PATCH",
          body: { notReadIds, userId },
        };
      },
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotifsQuery, useReadNotifsMutation } = notifApi;
