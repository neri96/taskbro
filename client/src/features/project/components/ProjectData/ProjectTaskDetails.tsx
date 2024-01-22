import classnames from "classnames";

import AnimElement from "../../../../components/AnimElement";
import Icon from "../../../../components/Icon";

import IcCheck from "../../../../assets/icons/check.svg";
import AudioClick from "../../../../assets/sounds/click.wav";
import AudioUnclick from "../../../../assets/sounds/unclick.wav";

import {
  ITask,
  useProjectTaskModifyMutation,
} from "../../../../app/services/project";
import useProjectComplete from "../../hooks/useProjectComplete";
import useProjectData from "../../hooks/useProjectData";

import styles from "./ProjectTaskDetails.module.scss";

const ProjectTaskDetails = ({ data }: { data: ITask }) => {
  const { data: projectData } = useProjectData();
  const projectComplete = useProjectComplete();

  const { task, completed, _id: taskId } = data;

  const [taskModify] = useProjectTaskModifyMutation();

  const handleChange = async () => {
    const { id, completed: isProjectCompleted } = projectData || {};

    try {
      if (id && taskId) {
        const result = await taskModify({
          projectId: id,
          taskId,
          isCurrentlyCompleted: completed,
        }).unwrap();

        if (result.isTaskCompleted) {
          new Audio(AudioClick).play();

          if (result.isFinished && id) {
            await projectComplete({
              projectId: id,
              isCurrentlyCompleted: false,
            });
          }
        } else {
          new Audio(AudioUnclick).play();

          if (!result.isFinished && isProjectCompleted && id) {
            await projectComplete({
              projectId: id,
              isCurrentlyCompleted: true,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={classnames(styles.ptDetails, {
        [styles.completed]: completed,
      })}
    >
      <AnimElement
        isOpen={completed}
        style={{
          margin: " 0 6px",
          position: "absolute",
          top: "50%",
          left: "8px",
          transform: "translateY(-50%) ",
        }}
      >
        <Icon src={IcCheck} alt="checked" style={{ height: "18px" }} />
      </AnimElement>
      <input
        type="checkbox"
        id={taskId}
        checked={completed}
        onChange={handleChange}
      />
      <label htmlFor={taskId}>{task}</label>
    </div>
  );
};

export default ProjectTaskDetails;
