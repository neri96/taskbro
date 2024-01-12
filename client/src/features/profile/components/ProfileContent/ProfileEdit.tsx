import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

import Icon from "../../../../components/Icon";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import FormFooter from "../../../../components/FormFooter";
import Button, { BtnType } from "../../../../components/Button";

import IcEdit from "../../../../assets/icons/edit.svg";

import { useEditMutation } from "../../../../app/services/user";

interface IUserData {
  id: string;
  name: string;
  bio: string;
  job: string;
}

const ProfileEdit = ({ userData }: { userData: IUserData }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const handleToggle = () => setIsEditOpen((isEditOpen) => !isEditOpen);

  const [editProfile] = useEditMutation();

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>();

  useEffect(() => {
    if (userData) {
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          const element = userData[key as keyof IUserData];

          if (element) setValue(key as keyof IUserData, element);
        }
      }
    }
  }, [userData]);

  const onSubmit = async () => {
    const value = getValues();

    try {
      await editProfile(value);

      handleToggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Icon src={IcEdit} alt="Edit Profile" handleClick={handleToggle} />

      <Modal
        isOpen={isEditOpen}
        closeModal={handleToggle}
        header="Edit Profile"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            name="name"
            error={""}
            register={register}
            rules={{
              required: "This field is required",
            }}
          />
          <Input label="Job Title" name="job" error={""} register={register} />
          <Input
            label="Bio"
            name="bio"
            error={""}
            isTextarea={true}
            register={register}
          />
          <FormFooter>
            <Button btnType={BtnType.Submit}>Update</Button>
          </FormFooter>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEdit;
