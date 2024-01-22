import UserImage from "../../../../components/UserImage";
import Icon from "../../../../components/Icon";

import IcMore from "../../../../assets/icons/more.svg";

import styles from "./ProjectMembers.module.scss";

import { IUser } from "../../../../app/services/user";

const ProjectMembers = ({ data }: { data: IUser[] }) => {
  return (
    <div className={styles.projectMembers}>
      {data.map(({ id, name, nickname, image }) => {
        return (
          <div key={id} className={styles.projectMember}>
            <UserImage
              src={image}
              alt={name}
              toolTip={{ content: name }}
              round
              link={`/user/${nickname}`}
            />
          </div>
        );
      })}
      <div className={styles.projectMemberMore}>
        <Icon src={IcMore} alt={"More"} />
      </div>
    </div>
  );
};

export default ProjectMembers;
