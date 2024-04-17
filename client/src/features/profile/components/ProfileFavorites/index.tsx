import { useState, useEffect, ChangeEvent } from "react";

import classnames from "classnames";

import Protected from "../../../../components/Protected";
import ProfileFavList from "./ProfileFavList";
import Input from "../../../../components/Input";
import CloseSidebar, {
  ClosePosition,
} from "../../../../components/CloseSidebar";

import { useLazySearchQuery } from "../../../../app/services/user";

import styles from "./style.module.scss";

const ProfileFavorites = ({
  userId,
  isFavListOpen,
  handleFavList,
}: {
  userId: string;
  isFavListOpen: boolean;
  handleFavList: () => void;
}) => {
  const [userName, setUserName] = useState<string>("");

  const [searchUsers, { data }] = useLazySearchQuery();

  useEffect(() => {
    if (userName.length >= 3) {
      searchUsers(userName);
    }
  }, [userName]);

  return (
    <aside
      className={classnames(styles.favorites, {
        [styles.open]: isFavListOpen,
      })}
    >
      <CloseSidebar
        position={ClosePosition.Right}
        isSidebarOpen={isFavListOpen}
        handleSidebar={handleFavList}
      />
      <Protected allowedUsers={[userId]}>
        <div className={styles.favoritesSearch}>
          <Input
            style={{ margin: "0" }}
            fieldType="text"
            name="user"
            value={userName}
            placeholder="Type in user name"
            handleChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setUserName(e.target.value)}
          />
        </div>
      </Protected>
      <ProfileFavList userName={userName} searchList={data} />
    </aside>
  );
};

export default ProfileFavorites;
