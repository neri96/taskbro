import { useEffect } from "react";

import { v4 as uuid } from "uuid";

import io from "socket.io-client";

import classnames from "classnames";

import {
  useMessagesQuery,
  useLazyMessagesQuery,
} from "../../../app/services/chat";

import useUserData from "../../../hooks/useUserData";

import Chat from "../../../components/Chat";
import CloseSidebar from "../../../components/CloseSidebar";
import Loading from "../../../components/Loading";

import styles from "./ProjectChat.module.scss";

const socket = io("http://localhost:8000");

const ProjectChat = ({
  chatId,
  isChatOpen,
  handleChatVisib,
}: {
  chatId: string;
  isChatOpen: boolean;
  handleChatVisib: () => void;
}) => {
  const userData = useUserData();

  const { data, isLoading } = useMessagesQuery(chatId);

  const [getMessages] = useLazyMessagesQuery();

  useEffect(() => {
    socket.emit("join", chatId);
  }, []);

  useEffect(() => {
    socket.on("get_message", async () => {
      await getMessages(chatId).unwrap();
    });
  }, [socket]);

  const sendMessage = (content: string) => {
    const { name, image } = userData;

    socket.emit("send", {
      id: uuid(),
      from: { name, image },
      content,
      chat: chatId,
    });
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div
      className={classnames(styles.projectChat, {
        [styles.isChatOpen]: isChatOpen,
      })}
    >
      <CloseSidebar
        isSidebarOpen={isChatOpen}
        handleSidebar={handleChatVisib}
      />
      <Chat
        data={data}
        chatId={chatId}
        userId={userData?.id}
        newMessageData={{
          chat: chatId,
          from: userData.id,
          isPrivate: false,
        }}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ProjectChat;
