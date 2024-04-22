import { ReactNode, useContext } from "react";

import NewMessageDetails from "./NewMessageDetails";

import { NewMessageDataCtx } from "../../../context";

import style from "./NewMessageList.module.scss";

const NewMessageList = ({
  isFullOpen = false,
  children,
}: {
  isFullOpen?: boolean;
  children?: ReactNode;
}) => {
  const { data } = useContext(NewMessageDataCtx);
  console.log(isFullOpen);

  return (
    <div className={style.newMessageListWrap}>
      <div className={style.newMessageList}>
        {data.map((newMessage, index) => {
          return (
            <NewMessageDetails
              key={newMessage.id}
              data={newMessage}
              lowerScrollMarker={isFullOpen && index === data.length - 3}
            />
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default NewMessageList;
