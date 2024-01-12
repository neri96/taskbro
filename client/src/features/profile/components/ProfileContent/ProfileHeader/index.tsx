import { ChangeEvent } from "react";

import Protected from "../../../../../components/Protected";
import ProfileHeaderMessage from "./ProfileHeaderMessage";
import ProfileHeaderFav from "./ProfileHeaderFav";
import UserImage from "../../../../../components/UserImage";
import Icon from "../../../../../components/Icon";

import IcUpload from "../../../../../assets/icons/upload.svg";

import { useChangeImageMutation } from "../../../../../app/services/user";

import styles from "./style.module.scss";

const ProfileHeader = ({
  userId,
  name,
  image,
  isFetching,
}: {
  userId: string;
  name: string;
  image: string;
  isFetching: boolean;
}) => {
  const [changeImage] = useChangeImageMutation();

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return false;

    const file = files[0];

    const formData: any = new FormData();

    formData.append("id", userId);
    formData.append("image", file);

    try {
      await changeImage(formData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderContent}>
        <Protected excluded={userId}>
          <ProfileHeaderFav userId={userId} />
        </Protected>
        <div className={styles.profilePicture}>
          {!isFetching ? <UserImage src={image} alt={name} /> : null}

          <Protected allowedUsers={[userId]}>
            <div className={styles.profileNewPic}>
              <div className={styles.profileNewPicContainer}>
                <div className={styles.profileNewPicIcon}>
                  <Icon
                    src={IcUpload}
                    alt="Upload"
                    style={{ height: "70px" }}
                  />
                </div>
                <label htmlFor="profile-pic" />
                <input
                  id="profile-pic"
                  type="file"
                  name="image"
                  onChange={handleSelectFile}
                />
              </div>
            </div>
          </Protected>
        </div>
        <Protected excluded={userId}>
          <ProfileHeaderMessage />
        </Protected>
      </div>
    </div>
  );
};

export default ProfileHeader;
