import Icon from "../../../../components/Icon";
import UserImage from "../../../../components/UserImage";

import IcRemove from "../../../../assets/icons/remove.svg";

import useUserData from "../../../../hooks/useUserData";
import useProjectData from "../../hooks/useProjectData";

import styles from "./ProjectTeamDetails.module.scss";

import { IUser } from "../../../../app/services/user";

const ProjectTeamDetails = ({
  data,
  handleDelete,
}: {
  data: IUser;
  handleDelete: (id: string, name: string) => void;
}) => {
  const { id: memberId, name, image } = data;

  const { id: myId } = useUserData();
  const { data: projectData } = useProjectData();

  return (
    <div className={styles.ptDetails}>
      {projectData?.manager === myId && memberId !== myId ? (
        <div className={styles.ptDetailsRemove}>
          <Icon
            src={IcRemove}
            alt="Remove"
            handleClick={() => handleDelete(memberId, name)}
          />
        </div>
      ) : null}
      <div className={styles.ptDetailsBody}>
        <UserImage src={image} alt={name} />
      </div>
      <div className={styles.ptDetailsFooter}>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default ProjectTeamDetails;
