import { useEffect } from "react";

import {
  useForm,
  SubmitHandler,
  Controller,
  UseControllerReturn,
} from "react-hook-form";

import { useProjectEditMutation } from "../../../../../app/services/project";

import useClickOutside from "../../../../../hooks/useClickOutside";

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

  const [editProject] = useProjectEditMutation();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
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
      console.log(error);
    }
  };

  return (
    <>
      <Icon src={IcEdit} alt="Edit" handleClick={handleToggleEdit} />

      <Modal header="Edit" isOpen={isEditOpen} closeModal={handleToggleEdit}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
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
              <Input label="Deadline" name="deadline" isDatePicker>
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
            rules={{
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
