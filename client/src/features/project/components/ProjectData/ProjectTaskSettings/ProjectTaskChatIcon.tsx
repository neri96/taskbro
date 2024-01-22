import { useContext } from "react";

import Icon from "../../../../../components/Icon";

import { ProjectTaskChatCtx } from "../../../../../context";

import IcMsg from "../../../../../assets/icons/message.svg";

const ProjectTaskChatIcon = () => {
  const { isChatOpen, handleChatVisib } = useContext(ProjectTaskChatCtx);

  return (
    <Icon
      src={IcMsg}
      alt={`${isChatOpen ? "Close" : "Open"} Chat`}
      handleClick={() => handleChatVisib && handleChatVisib()}
    />
  );
};

export default ProjectTaskChatIcon;
