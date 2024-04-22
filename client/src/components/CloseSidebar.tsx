import { CSSProperties } from "react";

import Icon from "./Icon";

import IcClose from "../assets/icons/close.svg";

export enum ClosePosition {
  Left = "left",
  Right = "right",
}

const CloseSidebar = ({
  position = ClosePosition.Left,
  isSidebarOpen,
  handleSidebar,
  style,
}: {
  position?: ClosePosition;
  isSidebarOpen: boolean;
  handleSidebar: () => void;
  style?: CSSProperties;
}) => {
  return isSidebarOpen ? (
    <div
      style={{
        position: "absolute",
        top: "10px",
        [position === ClosePosition.Left ? "left" : "right"]: "-30px",
        ...style,
      }}
    >
      <Icon src={IcClose} alt="Close sidebar" handleClick={handleSidebar} />
    </div>
  ) : null;
};

export default CloseSidebar;
