import { CSSProperties, ReactNode, MouseEvent } from "react";

import { AnimatePresence, motion } from "framer-motion";

const AnimElement = ({
  isOpen,
  children,
  handleClick,
  style,
}: {
  isOpen: boolean;
  children: ReactNode;
  handleClick?: (e?: MouseEvent<HTMLUnknownElement>) => void;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={style}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimElement;
