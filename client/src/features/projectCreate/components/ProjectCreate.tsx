import { useState } from "react";

import ProjectCreateWizard from "./ProjectCreateWizard";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";

import IcAdd from "../../../assets/icons/add.svg";

import { ProjectCreateCtx } from "../../../context";

const ProjectCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen((isOpen) => !isOpen);

  return (
    <>
      <Icon src={IcAdd} alt="Add new project" handleClick={toggleModal} />

      <Modal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        header="Create New Project"
      >
        <ProjectCreateCtx.Provider value={{ toggleModal }}>
          <ProjectCreateWizard />
        </ProjectCreateCtx.Provider>
      </Modal>
    </>
  );
};

export default ProjectCreate;
