import { useLocation } from "react-router-dom";

import UserList from "../../../../components/UserList";

import {
  IFav,
  IUser,
  useGetUserQuery,
  useModifyFavListMutation,
} from "../../../../app/services/user";

import styles from "./ProfileFavList.module.scss";

const ProfileFavList = ({
  userName,
  searchList,
}: {
  userName: string;
  searchList: IUser[] | undefined;
}) => {
  const location = useLocation();
  const userNickname = location.pathname.split("/")[2];

  const { data } = useGetUserQuery(userNickname);
  const [favModify] = useModifyFavListMutation();

  const { id: userId, favorites } = data || {};

  return searchList?.length || favorites?.length ? (
    <UserList
      users={userName.length >= 2 && searchList ? searchList : favorites}
      target={(favorites || searchList || []).map((fav: IFav) => {
        const { id } = fav;

        return id;
      })}
      handleModify={({ id: favId }: { id: string; name?: string }) =>
        userId && favModify({ userId, favId })
      }
    />
  ) : (
    <div className={styles.noFavs}>No favorites</div>
  );
};

export default ProfileFavList;
