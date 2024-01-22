import { useContext } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { useProjectTaskAddMutation } from "../../../../app/services/project";

import Button, { BtnType } from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import FormFooter from "../../../../components/FormFooter";

import useProjectData from "../../hooks/useProjectData";
import useClickOutside from "../../../../hooks/useClickOutside";

import IcAdd from "../../../../assets/icons/add2.svg";

import styles from "./ProjectTaskAdd.module.scss";

import { ProjectPastDueCtx } from "../../../../context";

const ProjectTaskAdd = () => {
  const { data: projectData } = useProjectData();

  const { ref, isVisible, handleToggle } = useClickOutside();
  const projectPastDue = useContext(ProjectPastDueCtx);

  const [addTask] = useProjectTaskAddMutation();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ task: string }>();

  const onSubmit: SubmitHandler<{ task: string }> = async ({ task }) => {
    try {
      if (projectData) {
        await addTask({ projectId: projectData.id, task }).unwrap();

        handleToggle();
        setValue("task", "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.ptAddContainer} ref={ref}>
      <div className={styles.ptAdd}>
        <Button
          handleClick={!projectPastDue ? handleToggle : undefined}
          disabled={projectPastDue}
        >
          <Icon src={IcAdd} alt="Add new task" />
        </Button>
      </div>

      <Modal
        header={"Add new task"}
        isOpen={isVisible}
        closeModal={handleToggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="task"
            label="Task"
            error={""}
            register={register}
            rules={{
              required: "This field is required",
            }}
          />

          <FormFooter style={{ marginBottom: "15px" }}>
            <Button btnType={BtnType.Submit}>Add</Button>
          </FormFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectTaskAdd;
