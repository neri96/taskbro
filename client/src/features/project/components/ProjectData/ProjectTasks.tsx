import ProjectTaskComplete from "./ProjectTaskComplete";
import ProjectTaskAdd from "./ProjectTaskAdd";
import ProjectTaskDetails from "./ProjectTaskDetails";

import styles from "./ProjectTasks.module.scss";

import { ITask } from "../../../../app/services/project";

const ProjectTasks = ({ data }: { data: ITask[] }) => {
  return (
    <div className={styles.projectTasks}>
      <div className={styles.projectTasksTop}>
        <div className={styles.projectTasksAll}>
          {data.map((task) => {
            return <ProjectTaskDetails key={task._id} data={task} />;
          })}
        </div>
      </div>
      <div className={styles.projectTasksBottom}>
        <ProjectTaskAdd />
        <ProjectTaskComplete />
      </div>
    </div>
  );
};

export default ProjectTasks;
