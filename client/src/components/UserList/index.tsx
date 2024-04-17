import { Link } from "react-router-dom";

import Icon from "../Icon";
import UserImage from "../UserImage";

import useUserData from "../../hooks/useUserData";

import IcAdd from "../../assets/icons/add2.svg";
import IcMinus from "../../assets/icons/minus.svg";

import styles from "./styles.module.scss";

import { IFav, IUser } from "../../app/services/user";

export interface IUserList {
  id: string;
  name: string;
  nickname: string;
  image: string;
}
const UserList = ({
  users,
  target,
  handleModify,
}: {
  users: IUserList[] | IUser[] | IFav[] | undefined;
  target: string[];
  handleModify: (input: IUserList) => void;
}) => {
  const { id: userId } = useUserData();

  return (
    <ul>
      {users?.map((user) => {
        const { id, name, nickname, image } = user;

        return (
          <li key={id} className={styles.userList}>
            <Link to={`/user/${nickname}`}>
              <div className={styles.userListData}>
                <div className={styles.userListPic}>
                  <UserImage src={image} alt={nickname} round />
                </div>
                <div className={styles.userListName}>
                  <h4>{nickname}</h4>
                </div>
              </div>
            </Link>
            {id !== userId ? (
              <div
                className={styles.userListModify}
                onClick={() => handleModify({ id, name, nickname, image })}
              >
                {target.includes(id) ? (
                  <Icon src={IcMinus} alt="Remove" />
                ) : (
                  <Icon src={IcAdd} alt="Add" />
                )}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
