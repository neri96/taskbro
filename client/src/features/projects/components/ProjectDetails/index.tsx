import moment from "moment";
import classnames from "classnames";

import { useNavigate } from "react-router-dom";

import ProjectDetailsData from "./ProjectDetailsData";
import ProjectDetailsTeam from "./ProjectDetailsTeam";

import styles from "./style.module.scss";

import { IProject } from "../../../../app/services/project";

const ProjectDetails = ({ data }: { data: IProject }) => {
  const navigate = useNavigate();

  const { id, uid, title, deadline, team, tasks, completed } = data;

  return (
    <div
      className={classnames(styles.projectDetails, {
        [styles.completed]: completed,
        [styles.cancelled]: Date.now() > deadline,
      })}
    >
      <div onClick={() => navigate(`/project/${uid || id}`)}>
        <div className={styles.projectDetailsHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.projectDetailsDeadline}>
          Deadline: {moment(deadline).format("MM.DD.YYYY")}
        </div>
        <ProjectDetailsData
          tasks={tasks}
          completed={completed}
          pastDue={Date.now() > deadline}
        />
      </div>

      <ProjectDetailsTeam data={team} />
    </div>
  );
};

export default ProjectDetails;
