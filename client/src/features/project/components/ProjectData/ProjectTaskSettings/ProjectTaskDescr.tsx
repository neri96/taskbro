import Icon from "../../../../../components/Icon";
import Modal from "../../../../../components/Modal";
import Button from "../../../../../components/Button";
import FormFooter from "../../../../../components/FormFooter";

import useClickOutside from "../../../../../hooks/useClickOutside";

import IcInfo from "../../../../../assets/icons/info.svg";

import styles from "./ProjectTaskDescr.module.scss";

const ProjectTaskDescr = ({ description }: { description: string }) => {
  const { isVisible: isDescrOpen, handleToggle: handleToggleDescr } =
    useClickOutside();

  return (
    <>
      <Icon src={IcInfo} alt="Description" handleClick={handleToggleDescr} />

      <Modal
        header="Description"
        isOpen={isDescrOpen}
        closeModal={handleToggleDescr}
      >
        <div className={styles.ptDescr}>{description}</div>
        <FormFooter>
          <Button handleClick={handleToggleDescr}>Ok</Button>
        </FormFooter>
      </Modal>
    </>
  );
};

export default ProjectTaskDescr;
