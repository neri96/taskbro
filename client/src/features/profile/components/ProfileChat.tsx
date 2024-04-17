import { useEffect } from "react";
import { v4 as uuid } from "uuid";

import io from "socket.io-client";

import {
  usePrivateMessagesQuery,
  useLazyPrivateMessagesQuery,
} from "../../../app/services/chat";

import AnimElement from "../../../components/AnimElement";
import CloseSidebar, { ClosePosition } from "../../../components/CloseSidebar";
import Chat from "../../../components/Chat";
import Loading from "../../../components/Loading";

import useUserData from "../../../hooks/useUserData";

const socket = io(import.meta.env.VITE_BASE_URL);

const ProfileChat = ({
  isChatOpen,
  companionId,
  handleChatVisibility,
}: {
  isChatOpen: boolean;
  companionId: string;
  handleChatVisibility: () => void;
}) => {
  const userData = useUserData();

  const userId = userData?.id;

  const { data, isLoading } = usePrivateMessagesQuery(
    { to: userId, from: companionId },
    { skip: !userId || !companionId }
  );

  const chatId = userId + companionId;

  const [getMessages] = useLazyPrivateMessagesQuery();

  useEffect(() => {
    socket.emit("join_private", chatId);
  }, []);

  useEffect(() => {
    socket.on("get_private_message", async () => {
      await getMessages({ to: userId, from: companionId }).unwrap();
    });
  }, [socket]);

  const sendMessage = (content: string) => {
    const { name, image } = userData;

    socket.emit("send_private", {
      id: uuid(),
      from: { name, image },
      content,
      chat: chatId,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return data ? (
    <AnimElement
      isOpen={isChatOpen}
      style={{ position: "relative", minWidth: "400px" }}
    >
      <CloseSidebar
        position={ClosePosition.Left}
        isSidebarOpen={isChatOpen}
        handleSidebar={handleChatVisibility}
      />
      <Chat
        data={data}
        chatId={chatId}
        userId={userId}
        newMessageData={{
          to: companionId,
          from: userId,
          isPrivate: true,
        }}
        sendMessage={sendMessage}
        style={{
          height: "100%",
          width: "400px",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
    </AnimElement>
  ) : null;
};

export default ProfileChat;
