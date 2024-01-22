import { useContext } from "react";

import Button, { BtnColor } from "../../../../components/Button";

import useProjectComplete from "../../hooks/useProjectComplete";
import useProjectData from "../../hooks/useProjectData";

import { ProjectPastDueCtx } from "../../../../context";

import styles from "./ProjectTaskComplete.module.scss";

const ProjectTaskComplete = () => {
  const { data } = useProjectData();

  const { id, completed: isProjectCompleted } = data || {};

  const projectComplete = useProjectComplete();
  const projectPastDue = useContext(ProjectPastDueCtx);

  const handleComplete = async () => {
    if (id && isProjectCompleted !== undefined && !projectPastDue) {
      await projectComplete({
        projectId: id,
        isCurrentlyCompleted: isProjectCompleted,
      });
    }
  };

  return (
    <div className={styles.projectTaskComplete}>
      <Button
        color={isProjectCompleted ? BtnColor.Default : BtnColor.Success}
        handleClick={handleComplete}
        disabled={projectPastDue}
      >
        {isProjectCompleted ? "Completed" : "Complete"}
      </Button>
    </div>
  );
};

export default ProjectTaskComplete;
