import { api } from "./api";

import { IChatData } from "./project";

export interface ICompanion {
  id: string;
  name: string;
  nickname: string;
  image: string;
}

export interface IMessageData {
  id: string;
  chat: string;
  content: string;
  from: ICompanion;
  createdAt: string;
  updatedAt: string;
}

export interface IPrivate {
  id: string;
  to: ICompanion;
  from: ICompanion;
  read: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface IMessageInput extends IChatData {
  content: string;
}

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    messages: build.query<IMessageData[], string>({
      query(id) {
        return {
          url: "/chat/messages",
          method: "GET",
          params: { id },
        };
      },
      providesTags: ["Chat"],
    }),
    privateMessages: build.query<IPrivate[], { to: string; from: string }>({
      query({ to, from }) {
        return {
          url: "/chat/private-messages",
          method: "GET",
          params: { to, from },
        };
      },
      providesTags: ["Chat"],
    }),
    newPrivateMessage: build.query<
      { messages: IPrivate[]; total: number },
      { userId: string; limit: number; fetchCount?: number }
    >({
      query(params) {
        return {
          url: "/chat/new-private-messages",
          method: "GET",
          params,
        };
      },
      providesTags: ["Chat"],
    }),
    readPrivateMsgs: build.mutation<string, { msgIds: string[] }>({
      query(body) {
        return {
          url: "/chat/read-private-messages",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Chat"],
    }),
    createMessage: build.mutation<string, IMessageInput>({
      query(body) {
        return {
          url: "/chat/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useMessagesQuery,
  usePrivateMessagesQuery,
  useNewPrivateMessageQuery,
  useLazyNewPrivateMessageQuery,
  useLazyMessagesQuery,
  useLazyPrivateMessagesQuery,
  useReadPrivateMsgsMutation,
  useCreateMessageMutation,
} = chatApi;
