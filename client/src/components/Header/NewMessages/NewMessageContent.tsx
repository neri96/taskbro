import { useState } from "react";

import AnimElement from "../../AnimElement";
import Button from "../../Button";
import NewMessageList from "./NewMessageList";
import NewMessageFull from "./NewMessageFull";

import style from "./NewMessageContent.module.scss";

const NewMessageContent = ({
  isNewMsgListOpen,
}: {
  isNewMsgListOpen: boolean;
}) => {
  const [isFullOpen, setIsFullOpen] = useState<boolean>(false);

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
