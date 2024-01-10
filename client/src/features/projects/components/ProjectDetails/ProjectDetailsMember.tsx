import UserImage from "../../../../components/UserImage";

import styles from "./ProjectDetailsMember.module.scss";

import { ITeamMember } from "./ProjectDetailsTeam";

interface IProps extends ITeamMember {
  index: number;
}

const ProjectDetailsMember = ({ data }: { data: IProps }) => {
  const { name, nickname, image, index } = data;

  return (
    <li
      style={{ left: index * 30 + "px" }}
      className={styles.projectDetailsMember}
    >
      <UserImage
        src={image}
        alt={name}
        toolTip={{ content: name }}
        round
        link={`/user/${nickname}`}
      />
    </li>
  );
};

export default ProjectDetailsMember;
