import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../app/store";

import { setIsChatOpen } from "../../../app/globalSlice";
import { IPrivate } from "../../../app/services/chat";

import UserImage from "../../UserImage";

import { NewMessageDataCtx } from "../../../context";

import style from "./NewMessageDetails.module.scss";

const NewMessageDetails = ({
  data,
  lowerScrollMarker,
}: {
  data: IPrivate;
  lowerScrollMarker: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { markerRef } = useContext(NewMessageDataCtx);
  const itemProps = lowerScrollMarker ? { ref: markerRef } : {};

  const { from, content } = data;

  const handleClick = () => {
    navigate(`/user/${from.nickname}`);
    dispatch(setIsChatOpen(true));
  };

  return (
    <div className={style.nmDetails} onClick={handleClick} {...itemProps}>
      <div className={style.nmDetailsImg}>
        <UserImage src={from.image} alt={from.nickname} round />
      </div>
      <div className={style.nmDetailsContent}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NewMessageDetails;
