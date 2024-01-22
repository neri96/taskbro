import ProjectTasks from "./ProjectTasks";
import ProjectMembers from "./ProjectMembers";
import ProjectTaskSettings from "./ProjectTaskSettings";

import styles from "./style.module.scss";

import { IProject } from "../../../../app/services/project";

import { ProjectPastDueCtx } from "../../../../context";

const ProjectData = ({ data }: { data: IProject }) => {
  const { id, title, deadline, team, tasks, description } = data;

  return (
    <div className={styles.projectData}>
      <div className={styles.projectDataBody}>
        <div className={styles.projectDataTop}>
          <div className={styles.projectDataTitle}>
            <h3>{title}</h3>
          </div>
          <ProjectTaskSettings
            id={id}
            title={title}
            deadline={deadline}
            description={description}
          />
        </div>

        <div className={styles.projectDataContent}>
          <ProjectMembers data={team} />
          <ProjectPastDueCtx.Provider value={Date.now() > deadline}>
            <ProjectTasks data={tasks} />
          </ProjectPastDueCtx.Provider>
        </div>
      </div>
    </div>
  );
};

export default ProjectData;
