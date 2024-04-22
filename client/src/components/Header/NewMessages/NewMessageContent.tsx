import { useState, useEffect, Dispatch, SetStateAction } from "react";

import AnimElement from "../../AnimElement";
import Button from "../../Button";
import NewMessageList from "./NewMessageList";
import NewMessageFull from "./NewMessageFull";

import style from "./NewMessageContent.module.scss";

const NewMessageContent = ({
  isNewMsgListOpen,
  setMsgLimit,
}: {
  isNewMsgListOpen: boolean;
  setMsgLimit: Dispatch<SetStateAction<number>>;
}) => {
  const [isFullOpen, setIsFullOpen] = useState<boolean>(false);

  useEffect(() => {
    setMsgLimit(isFullOpen ? 15 : 5);
  }, [isFullOpen]);

  const toggleFullModal = () => {
    setIsFullOpen((prevState) => !prevState);
  };

  return (
    <>
      <AnimElement
        isOpen={isNewMsgListOpen}
        style={{
          width: "200px",
          position: "absolute",
          top: "calc(100% + 20px)",
          left: "-150px",
        }}
      >
        <NewMessageList>
          <div className={style.newMessageMore}>
            <Button handleClick={toggleFullModal}>More</Button>
          </div>
        </NewMessageList>
      </AnimElement>
      <NewMessageFull isOpen={isFullOpen} toggleFullModal={toggleFullModal} />
    </>
  );
};

export default NewMessageContent;
