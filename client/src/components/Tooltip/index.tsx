import { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./style.module.scss";

const Tooltip = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.tooltip}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
