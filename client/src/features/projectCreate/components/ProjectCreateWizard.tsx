import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { useGetUserQuery } from "../../../app/services/user";

import ProjectCreateForm from "./ProjectCreateForm";
import ProjectCreateTeam from "./ProjectCreateTeam";
import ProjectCreateSearch from "./ProjectCreateSearch";

import useWizard from "../../../hooks/useWizard";
import useUserData from "../../../hooks/useUserData";

import { IProjectInput } from "../../../app/services/project";

import { IUserList } from "../../../components/UserList";

const ProjectCreateWizard = () => {
  const userData = useUserData();
  const { data } = useGetUserQuery(userData.id);

  const [team, setTeam] = useState<IUserList[]>([]);

  const { parentStyle, childrenStyle, handlePrev, handleNext } = useWizard();

  useEffect(() => {
    if (data) {
      // setting the creator as the first default member
      const { id, name, nickname, image } = data;

      setTeam((prevState) => [...prevState, { id, name, nickname, image }]);
    }
  }, [data]);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectInput>();

  useEffect(() => {
    const result = team.map(({ nickname }) => nickname).join(", ");

    setValue("team", result);
  }, [team]);

  return (
    <div style={parentStyle}>
      <ProjectCreateForm
        manager={userData.id}
        getTeamData={() => team.map(({ id }) => id)}
        errors={errors}
        register={register}
        control={control}
        handleSubmit={handleSubmit}
        style={childrenStyle}
        handleNext={handleNext}
      />
      <ProjectCreateTeam
        team={team}
        setTeam={setTeam}
        style={childrenStyle}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <ProjectCreateSearch
        team={team}
        setTeam={setTeam}
        style={childrenStyle}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default ProjectCreateWizard;
