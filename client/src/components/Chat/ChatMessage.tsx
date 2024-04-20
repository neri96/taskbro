import moment from "moment";

import UserImage from "../../components/UserImage";

import classnames from "classnames";

import styles from "./ChatMessage.module.scss";

import { IMessage } from "./shared/interfaces";

const ChatMessage = ({ data, userId }: { data: IMessage; userId: string }) => {
  const {
    content,
    from: { id, name, image },
    createdAt,
  } = data;

  return (
    <div
      className={classnames(styles.chatMessage, {
        [styles.myMessage]: id === userId,
      })}
    >
      <div className={styles.chatMessageImage}>
        <UserImage src={image} alt={name} />
      </div>
      <div className={styles.chatMessageData}>
        <div className={styles.chatMessageName}>{name}</div>
        <div className={styles.chatMessageContent}>
          <p>{content}</p>
        </div>
        <div className={styles.chatMessageDate}>
          {moment(createdAt).format("hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
