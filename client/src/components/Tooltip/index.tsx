import { CSSProperties, ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./style.module.scss";

const Tooltip = ({
  isOpen,
  children,
  style,
}: {
  isOpen: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.tooltip}
          style={style}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
