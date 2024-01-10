import { CSSProperties, useState, useContext } from "react";

import {
  Controller,
  SubmitHandler,
  UseFormRegister,
  Control,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

import moment from "moment";

import { useProjectCreateMutation } from "../../../app/services/project";

import ProjectCreateList from "./ProjectCreateList";
import Input from "../../../components/Input";
import FormFooter from "../../../components/FormFooter";
import Button, { BtnType } from "../../../components/Button";
import Error from "../../../components/Error";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IProjectInput } from "../../../app/services/project";

import { ProjectCreateCtx } from "../../../context";

export interface ITaskLocal {
  current: string;
  error: string;
  list: {
    id: string;
    task: string;
  }[];
}

const ProjectCreateForm = ({
  control,
  register,
  handleSubmit,
  manager,
  getTeamData,
  style,
  handleNext,
  errors,
}: {
  control: Control<IProjectInput, any>;
  register: UseFormRegister<IProjectInput>;
  handleSubmit: UseFormHandleSubmit<IProjectInput, undefined>;
  manager: string;
  getTeamData: () => string[];
  style: CSSProperties;
  handleNext: () => void;
  errors: FieldErrors<IProjectInput>;
}) => {
  const { toggleModal } = useContext(ProjectCreateCtx);

  const [createProject] = useProjectCreateMutation();

  const [serverError, setServerError] = useState<string>("");
  const [tasks, setTasks] = useState<ITaskLocal>({
    current: "",
    error: "",
    list: [],
  });

  const onFocus = () => {
    if (serverError) setServerError("");
  };

  const onSubmit: SubmitHandler<IProjectInput> = async (data) => {
    try {
      if (!tasks.list.length) {
        return setTasks((prevState) => ({
          ...prevState,
          error: "Add at least one task",
        }));
      }

      await createProject({
        ...data,
        manager,
        deadline: moment(data.deadline).valueOf(),
        team: getTeamData(),
        tasks: tasks.list.map(({ task }) => ({
          task,
          completed: false,
        })),
      }).unwrap();

      toggleModal && toggleModal();
    } catch (error: any) {
      if ("data" in error) {
        setServerError(error.data);
      }
    }
  };

  return (
    <form
      style={style}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (tasks.current) e.preventDefault();
        }
      }}
    >
      {serverError ? <Error>{serverError}</Error> : null}
      <Input
        label="Title"
        name="title"
        error={errors.title?.message}
        handleFocus={onFocus}
        register={register}
        rules={{
          required: "This field is required",
        }}
      />
      <Controller
        control={control}
        name="deadline"
        rules={{ required: "This field is required" }}
        render={({ field: { onChange, value } }: any) => (
          <Input
            label="Deadline"
            name="deadline"
            isDatePicker
            error={errors.deadline?.message}
          >
            <DatePicker
              startDate={new Date()}
              onChange={onChange}
              selected={value}
              dateFormat="MM.dd.yyyy"
            />
          </Input>
        )}
      />
      <Input
        label="Team"
        name="team"
        error={""}
        register={register}
        readonly
        rules={{
          required: "This field is required",
        }}
        style={{ cursor: "pointer" }}
        handleFocus={onFocus}
        handleClick={handleNext}
      />
      <ProjectCreateList tasks={tasks} setTasks={setTasks} />
      <Input
        label="Description"
        name="description"
        error={errors.description?.message}
        handleFocus={onFocus}
        isTextarea
        register={register}
        rules={{
          required: "This field is required",
        }}
      />
      <FormFooter style={{ marginBottom: "15px" }}>
        <Button btnType={BtnType.Submit}>Create</Button>
      </FormFooter>
    </form>
  );
};

export default ProjectCreateForm;
