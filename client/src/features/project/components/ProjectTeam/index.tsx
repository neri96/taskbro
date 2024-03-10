import { useState } from "react";

import ProjectTeamDetails from "./ProjectTeamDetails";
import ProjectTeamKickout from "./ProjectTeamKickout";

import styles from "./style.module.scss";

import { IUser } from "../../../../app/services/user";

const ProjectTeam = ({ data }: { data: IUser[] }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });

  const handleToogleModal = () => {
    setIsDeleteOpen((prevState) => !prevState);
  };

  const handleDelete = (id: string, name: string) => {
    setCurrentUser({ id, name });
    handleToogleModal();
  };

  return (
    <>
      <div className={styles.projectTeam}>
        {data.map((member) => {
          return (
            <ProjectTeamDetails
              key={member.id}
              data={member}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <ProjectTeamKickout
        isDeleteOpen={isDeleteOpen}
        currentUser={currentUser}
        handleToogleModal={handleToogleModal}
      />
    </>
  );
};

export default ProjectTeam;
