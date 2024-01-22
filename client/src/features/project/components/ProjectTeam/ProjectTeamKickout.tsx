import Modal from "../../../../components/Modal";
import Button, { BtnColor, BtnType } from "../../../../components/Button";

import { useProjectKickMemberMutation } from "../../../../app/services/project";

import useProjectData from "../../hooks/useProjectData";

import styles from "./ProjectTeamKickout.module.scss";
import { FormEvent } from "react";

const ProjectTeamKickout = ({
  isDeleteOpen,
  currentUser,
  handleToogleModal,
}: {
  isDeleteOpen: boolean;
  currentUser: { id: string; name: string };
  handleToogleModal: () => void;
}) => {
  const { data } = useProjectData();
  const { id: projectId } = data || {};

  const [kickMember] = useProjectKickMemberMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectId) {
      await kickMember({ projectId, memberId: currentUser.id });

      handleToogleModal();
    }
  };

  return (
    <Modal isOpen={isDeleteOpen} closeModal={handleToogleModal}>
      <form onSubmit={handleSubmit}>
        <div className={styles.ptKickoutBody}>
          <h4>Are you sure you want to kick out {currentUser.name}?</h4>
        </div>
        <div className={styles.ptKickoutFooter}>
          <div className={styles.ptKickoutBtns}>
            <Button color={BtnColor.Danger} handleClick={handleToogleModal}>
              No
            </Button>
            <Button btnType={BtnType.Submit} color={BtnColor.Success}>
              Yes
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectTeamKickout;
