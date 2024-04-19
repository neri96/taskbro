import { useAppDispatch } from "../../../app/store";

import { useNavigate } from "react-router-dom";

import { setIsChatOpen } from "../../../app/globalSlice";

import UserImage from "../../UserImage";

import { IPrivate } from "../../../app/services/chat";

import style from "./NewMessageDetails.module.scss";

const NewMessageDetails = ({ data }: { data: IPrivate }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { from, content } = data;

  const handleClick = () => {
    navigate(`/user/${from.nickname}`);
    dispatch(setIsChatOpen(true));
  };

  return (
    <div className={style.nmDetails} onClick={handleClick}>
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
