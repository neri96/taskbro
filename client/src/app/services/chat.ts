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
  useLazyMessagesQuery,
  useLazyPrivateMessagesQuery,
  useCreateMessageMutation,
} = chatApi;
