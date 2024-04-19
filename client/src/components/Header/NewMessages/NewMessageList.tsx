import { ReactNode, useContext } from "react";

import NewMessageDetails from "./NewMessageDetails";

import { NewMessageDataCtx } from "../../../context";

import style from "./NewMessageList.module.scss";

const NewMessageList = ({ children }: { children?: ReactNode }) => {
  const { data } = useContext(NewMessageDataCtx);

  return (
    <div className={style.newMessageList}>
      {data.map((newMessage) => {
        return <NewMessageDetails key={newMessage.id} data={newMessage} />;
      })}
      {children}
    </div>
  );
};

export default NewMessageList;
