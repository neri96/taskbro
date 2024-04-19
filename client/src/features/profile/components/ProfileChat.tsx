import { useEffect } from "react";
import { v4 as uuid } from "uuid";

import io from "socket.io-client";

import {
  usePrivateMessagesQuery,
  useLazyPrivateMessagesQuery,
  useReadPrivateMsgsMutation,
} from "../../../app/services/chat";

import CloseSidebar, { ClosePosition } from "../../../components/CloseSidebar";
import Chat from "../../../components/Chat";
import Loading from "../../../components/Loading";

import useUserData from "../../../hooks/useUserData";

const socket = io(import.meta.env.VITE_BASE_URL);

const ProfileChat = ({
  companionId,
  handleChatVisibility,
}: {
  companionId: string;
  handleChatVisibility: () => void;
}) => {
  const userData = useUserData();

  const userId = userData?.id;

  const { data, isLoading } = usePrivateMessagesQuery(
    { to: userId, from: companionId },
    { skip: !userId || !companionId }
  );

  const chatId = [userId, companionId]
    .sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
    .join(""); // for users to be able to receive messages from each other they both must have a unique chat id, so here I used a value that includes ids of both participants and will be the regardless of order

  const [getMessages] = useLazyPrivateMessagesQuery();

  useEffect(() => {
    socket.emit("join_private", chatId);
  }, []);

  useEffect(() => {
    socket.on("get_private_message", async () => {
      await getMessages({ to: userId, from: companionId }).unwrap();
    });
  }, [socket]);

  // Reading messsages once chat is open

  const [readMessages] = useReadPrivateMsgsMutation();

  useEffect(() => {
    if (data) {
      const unreadMsgs = ((): string[] => {
        const result = [];

        for (const message of data) {
          const { id, read } = message;

          if (!read && userData.id === message.to.id) result.push(id);
        }

        return result;
      })();

      if (unreadMsgs.length) {
        readMessages({ msgIds: unreadMsgs });
      }
    }
  }, [data]);

  //

  const sendMessage = (content: string) => {
    const { name, image } = userData;

    socket.emit("send_private", {
      id: uuid(),
      from: { name, image },
      to: companionId,
      content,
      chat: chatId,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return data ? (
    <>
      <CloseSidebar
        position={ClosePosition.Left}
        isSidebarOpen
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
    </>
  ) : null;
};

export default ProfileChat;
