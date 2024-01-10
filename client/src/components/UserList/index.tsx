import { Link } from "react-router-dom";

import Icon from "../Icon";
import UserImage from "../UserImage";

import useUserData from "../../hooks/useUserData";

import IcAdd from "../../assets/icons/add2.svg";
import IcMinus from "../../assets/icons/minus.svg";

import styles from "./styles.module.scss";

import { IFav, IUser } from "../../app/services/user";

interface IHandleModifyInput {
  id: string;
  name?: string;
}

const UserList = ({
  users,
  target,
  handleModify,
}: {
  users: IUser[] | IFav[];
  target: string[];
  handleModify: (input: IHandleModifyInput) => void;
}) => {
  const { id: userId } = useUserData();

  return (
    <ul>
      {users?.map(({ id, name, nickname, image }) => (
        <li key={id} className={styles.userList}>
          <Link to={`/user/${nickname}`}>
            <div className={styles.userListData}>
              <div className={styles.userListPic}>
                <UserImage src={image} alt={name} round />
              </div>
              <div className={styles.userListName}>
                <h4>{name}</h4>
              </div>
            </div>
          </Link>
          {id !== userId ? (
            <div
              className={styles.userListModify}
              onClick={() => handleModify({ id, name })}
            >
              {target.includes(id) ? (
                <Icon src={IcMinus} alt="Remove" />
              ) : (
                <Icon src={IcAdd} alt="Add" />
              )}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
