import Modal from "../../Modal";
import Button from "../../Button";
import NewMessageList from "./NewMessageList";

import style from "./NewMessageFull.module.scss";

const NewMessageFull = ({
  isOpen,
  toggleFullModal,
}: {
  isOpen: boolean;
  toggleFullModal: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={toggleFullModal}>
      <NewMessageList>
        <div className={style.newMessageFull}>
          <Button handleClick={toggleFullModal}>Ok</Button>
        </div>
      </NewMessageList>
    </Modal>
  );
};

export default NewMessageFull;
