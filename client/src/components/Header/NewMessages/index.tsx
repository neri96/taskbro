import { useEffect, useState } from "react";

import io from "socket.io-client";

import {
  useNewPrivateMessageQuery,
  useLazyNewPrivateMessageQuery,
} from "../../../app/services/chat";
import useUserData from "../../../hooks/useUserData";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import NewMessageContent from "./NewMessageContent";

import IcMsg from "../../../assets/icons/message.svg";

import styles from "./style.module.scss";

import { NewMessageDataCtx } from "../../../context";

const socket = io(import.meta.env.VITE_BASE_URL);

const NewMessage = () => {
  const [msgLimit, setMsgLimit] = useState<number>(5);

  const [isNewMsgListOpen, setIsNewMsgListOpen] = useState<boolean>(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState<boolean>(false);

  const { id } = useUserData();
  const { ref, fetchCount } = useIntersectionObserver(msgLimit);

  const params = {
    userId: id,
    limit: msgLimit,
    fetchCount,
  };

  const { data } = useNewPrivateMessageQuery(params);
  const [getNewMessages] = useLazyNewPrivateMessageQuery();

  const { messages, total } = data || {};

  useEffect(() => {
    socket.emit("join_user", id);
  }, []);

  useEffect(() => {
    socket.on("get_new_private_message", async () => {
      await getNewMessages(params).unwrap();
    });
  }, [socket]);

  useEffect(() => {
    getNewMessages(params).unwrap();
  }, [fetchCount]);

  const toggleChat = () => {
    if (messages?.length) {
      setIsNewMsgListOpen((prevState) => !prevState);
    }
  };

  return (
    <Icon
      src={IcMsg}
      alt="Message"
      handleClick={toggleChat}
      handleToggle={() =>
        !messages?.length && setIsToolTipOpen((prevState) => !prevState)
      }
      style={{
        cursor: messages?.length ? "pointer" : "default",
      }}
    >
      {messages?.length ? (
        <>
          <div className={styles.msgQty}>{total}</div>

          <NewMessageDataCtx.Provider
            value={{ data: messages, markerRef: ref }}
          >
            <NewMessageContent
              isNewMsgListOpen={isNewMsgListOpen}
              setMsgLimit={setMsgLimit}
            />
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
