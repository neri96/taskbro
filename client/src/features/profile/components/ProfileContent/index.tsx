import { isMobile } from "react-device-detect";

import Protected from "../../../../components/Protected";
import ProfileEdit from "./ProfileEdit";
import ProfileHeader from "./ProfileHeader";
import Loading from "../../../../components/Loading";
import Icon from "../../../../components/Icon";

import IcFavs from "../../../../assets/icons/friends.svg";

import styles from "./style.module.scss";

import { IUser } from "../../../../app/services/user";

const ProfileContent = ({
  data,
  isLoading,
  isFetching,
  handleFavList,
}: {
  data: IUser;
  isLoading: boolean;
  isFetching: boolean;
  handleFavList: () => void;
}) => {
  const { id, nickname, name, job, bio, image } = data || {};

  return (
    <div className={styles.profileContent}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.profileTopBar}>
            <ul>
              {isMobile ? (
                <li>
                  <Icon
                    src={IcFavs}
                    alt="Favourites"
                    handleClick={handleFavList}
                  />
                </li>
              ) : null}
              <li>
                <Protected allowedUsers={[id]}>
                  <ProfileEdit userData={{ id, name, bio, job }} />
                </Protected>
              </li>
            </ul>
          </div>
          <ProfileHeader
            userId={id}
            name={name}
            image={image}
            isFetching={isFetching}
          />
          <div className={styles.profileNickname}>
            <h1>{nickname}</h1>
          </div>
          <div className={styles.profileName}>
            <h3>{name}</h3>
          </div>
          {job ? (
            <div className={styles.profileJob}>
              <h4>{job}</h4>
            </div>
          ) : null}
          <div className={styles.profileBio}>
            <div className={styles.profileBioContainer}>
              <h4>{bio}</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileContent;
