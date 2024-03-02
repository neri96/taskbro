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
}: {
  position?: ClosePosition;
  isSidebarOpen: boolean;
  handleSidebar: () => void;
}) => {
  return isSidebarOpen ? (
    <div
      style={{
        position: "absolute",
        top: "10px",
        [position === ClosePosition.Left ? "left" : "right"]: "-30px",
      }}
    >
      <Icon
        src={IcClose}
        alt="Close favorites list"
        handleClick={handleSidebar}
      />
    </div>
  ) : null;
};

export default CloseSidebar;
