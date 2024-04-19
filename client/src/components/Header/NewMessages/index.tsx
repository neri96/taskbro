import { useEffect, useState } from "react";

import io from "socket.io-client";

import {
  useNewPrivateMessageQuery,
  useLazyNewPrivateMessageQuery,
} from "../../../app/services/chat";
import useUserData from "../../../hooks/useUserData";

import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import NewMessageContent from "./NewMessageContent";

import IcMsg from "../../../assets/icons/message.svg";

import styles from "./style.module.scss";

import { NewMessageDataCtx } from "../../../context";

const socket = io(import.meta.env.VITE_BASE_URL);

const NewMessage = () => {
  const [isNewMsgListOpen, setIsNewMsgListOpen] = useState<boolean>(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState<boolean>(false);

  const { id } = useUserData();

  const { data } = useNewPrivateMessageQuery(id);
  const [getNewMessages] = useLazyNewPrivateMessageQuery();

  useEffect(() => {
    socket.emit("join_user", id);
  }, []);

  useEffect(() => {
    socket.on("get_new_private_message", async () => {
      console.log("socket worked");

      const x = await getNewMessages(id).unwrap();
      console.log(x);
    });
  }, [socket]);

  const toggleChat = () => {
    if (data?.length) {
      setIsNewMsgListOpen((prevState) => !prevState);
    }
  };

  return (
    <Icon
      src={IcMsg}
      alt="Message"
      handleClick={toggleChat}
      handleToggle={() => setIsToolTipOpen((prevState) => !prevState)}
      style={{
        cursor: data?.length ? "pointer" : "default",
      }}
    >
      {data?.length ? (
        <>
          <div className={styles.msgQty}>{data.length}</div>

          <NewMessageDataCtx.Provider value={{ data }}>
            <NewMessageContent isNewMsgListOpen={isNewMsgListOpen} />
          </NewMessageDataCtx.Provider>
        </>
      ) : (
        <Tooltip isOpen={isToolTipOpen} style={{ top: "50px", left: "-100px" }}>
          No new message
        </Tooltip>
      )}
    </Icon>
  );
};

export default NewMessage;
