import { useMemo } from "react";

import styles from "./ProjectDetailsData.module.scss";

import { ITask } from "../../../../app/services/project";

const ProjectDetailsData = ({
  tasks,
  completed,
  pastDue,
}: {
  tasks: ITask[];
  completed: boolean;
  pastDue: boolean;
}) => {
  const progress = useMemo(() => {
    const totalAmount = tasks.length;
    const completedAmount = tasks.reduce((total: number, { completed }) => {
      return completed ? total + 1 : total;
    }, 0);

    return parseFloat(((completedAmount / totalAmount) * 100).toFixed(1));
  }, [tasks]);

  return (
    <div className={styles.projectDetailsData}>
      <div>{completed ? "Completed" : pastDue ? "Failed" : "In Progress"}</div>
      <div
        style={{
          background: `radial-gradient(closest-side, #595959 79%, transparent 80% 100%), conic-gradient(green ${progress}%, #fff 0)`,
        }}
        className={styles.projectDetailsStatus}
      >
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default ProjectDetailsData;
