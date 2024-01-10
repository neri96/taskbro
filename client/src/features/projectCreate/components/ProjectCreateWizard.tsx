import { useState, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import ProjectCreateForm from "./ProjectCreateForm";
import ProjectCreateTeam from "./ProjectCreateTeam";
import ProjectCreateSearch from "./ProjectCreateSearch";

import useWizard from "../../../hooks/useWizard";
import useUserData from "../../../hooks/useUserData";
import { IProjectInput } from "../../../shared/interfaces/project.interface";

export interface ITeamLocal {
  id: string;
  name: string;
}

const ProjectCreateWizard = () => {
  const userData = useUserData();

  const [team, setTeam] = useState<ITeamLocal[]>([
    { id: userData.id, name: userData.name },
  ]);

  const { parentStyle, childrenStyle, handlePrev, handleNext } = useWizard();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectInput>();

  useEffect(() => {
    const result = team.map(({ name }) => name).join(", ");

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
