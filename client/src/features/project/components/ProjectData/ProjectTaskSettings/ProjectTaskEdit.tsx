import { useEffect } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useProjectEditMutation } from "../../../../../app/services/project";

import useClickOutside from "../../../../../hooks/useClickOutside";
import useError from "../../../../../hooks/useError";

import Modal from "../../../../../components/Modal";
import Icon from "../../../../../components/Icon";
import FormFooter from "../../../../../components/FormFooter";
import Button, { BtnType } from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import DatePicker from "react-datepicker";

import IcEdit from "../../../../../assets/icons/edit2.svg";

import { IProjectEdit } from "../../../../../app/services/project";

const ProjectTaskEdit = ({
  id,
  title,
  deadline,
  description,
}: {
  id: string;
  title: string;
  deadline: number;
  description: string;
}) => {
  const { isVisible: isEditOpen, handleToggle: handleToggleEdit } =
    useClickOutside();
  const { handleServerError } = useError();

  const [editProject] = useProjectEditMutation();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IProjectEdit>();

  useEffect(() => {
    const values: IProjectEdit = { title, deadline, description };

    Object.keys(values).forEach((_key) => {
      const key = _key as keyof IProjectEdit;
      setValue(key, values[key]);
    });
  }, []);

  const onSubmit: SubmitHandler<IProjectEdit> = async (data) => {
    try {
      await editProject({ id, ...data }).unwrap();

      handleToggleEdit();
    } catch (error) {
      handleServerError(error, setError);
    }
  };

  return (
    <>
      <Icon src={IcEdit} alt="Edit" handleClick={handleToggleEdit} />

      <Modal
        header="Edit"
        isOpen={isEditOpen}
        closeModal={handleToggleEdit}
        isOverflowHidden={false}
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            error={errors.title?.message}
            register={register}
            rules={{
              maxLength: 150,
              minLength: 3,
              required: "This field is required",
            }}
          />
          <Controller
            control={control}
            name="deadline"
            rules={{
              maxLength: 10,
              minLength: 10,
              required: "This field is required",
            }}
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
            label="Description"
            name="description"
            register={register}
            isTextarea
            error={errors.description?.message}
            rules={{
              maxLength: 1000,
              minLength: 50,
              required: "This field is required",
            }}
          />
          <FormFooter>
            <Button btnType={BtnType.Submit}>Update</Button>
          </FormFooter>
        </form>
      </Modal>
    </>
  );
};

export default ProjectTaskEdit;
