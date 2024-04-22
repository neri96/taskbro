import { useState, FormEvent, ChangeEvent } from "react";

import { useCreateMessageMutation } from "../../app/services/chat";

import ChatEmoji from "./ChatEmoji";
import Button, { BtnType } from "../../components/Button";

import styles from "./ChatInput.module.scss";

import { INewMessageData } from "./shared/interfaces";

const ChatInput = ({
  newMessageData,
  sendMessage,
}: {
  newMessageData: INewMessageData;
  sendMessage: (content: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");

  const [createMessage] = useCreateMessageMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        await createMessage({ ...newMessageData, content: message }).unwrap();

        sendMessage(message);
        setMessage("");
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div className={styles.chatInput}>
      <form onSubmit={handleSubmit}>
        <div className={styles.chatContainer}>
          <input
            name="message"
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <ChatEmoji setMessage={setMessage} />
        </div>
        <Button btnType={BtnType.Submit}>Send</Button>
      </form>
    </div>
  );
};

export default ChatInput;
