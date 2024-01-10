import { ReactNode } from "react";
import ReactDOM from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import styles from "./style.module.scss";

const Modal = ({
  isOpen,
  header,
  children,
  closeModal,
}: {
  isOpen: boolean;
  header?: ReactNode | string;
  children: ReactNode;
  closeModal: () => void;
}) => {
  const rootElement = document.querySelector("#modal");

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.backdrop}
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {header ? (
              <div className={styles.modalHeader}>
                <h4>{header}</h4>
              </div>
            ) : null}
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return rootElement ? ReactDOM.createPortal(content, rootElement) : null;
};

export default Modal;
