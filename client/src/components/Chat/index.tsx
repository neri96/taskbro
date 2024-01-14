import { CSSProperties } from "react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import styles from "./style.module.scss";

import { IMessage, INewMessageData } from "./shared/interfaces";
import { IMessageData, IPrivate } from "../../app/services/chat";

const Chat = ({
  data,
  userId,
  sendMessage,
  newMessageData,
  style,
}: {
  data: IMessageData[] | IPrivate[];
  userId: string;
  chatId?: string;
  sendMessage: (content: string) => void;
  newMessageData: INewMessageData;
  style?: CSSProperties;
}) => {
  return (
    <div style={style} className={styles.chat}>
      <div className={styles.chatHeader}>
        <h3>Chat</h3>
      </div>
      <div className={styles.chatBody}>
        {data?.map((message: IMessage) => {
          return (
            <ChatMessage key={message.id} data={message} userId={userId} />
          );
        })}
      </div>
      <ChatInput newMessageData={newMessageData} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
