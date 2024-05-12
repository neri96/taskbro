export interface IMessage {
  id: string;
  content: string;
  from: { id: string; nickname: string; image: string };
  createdAt: string;
}

export interface INewMessageData {
  to?: string;
  chat?: string;
  from: string;
  isPrivate: boolean;
}
