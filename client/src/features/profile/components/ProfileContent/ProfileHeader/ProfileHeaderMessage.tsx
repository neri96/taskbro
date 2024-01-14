import { useContext } from "react";
import { isMobile } from "react-device-detect";

import { ProfileChatStatusCtx } from "../../../../../context";

import Icon from "../../../../../components/Icon";

import IcMessage from "../../../../../assets/icons/message.svg";

const ProfileHeaderMessage = () => {
  const { handleChatVisibility } = useContext(ProfileChatStatusCtx);

  return (
    <Icon
      src={IcMessage}
      alt="Message"
      handleClick={() => handleChatVisibility && handleChatVisibility()}
      style={{ height: isMobile ? "40px" : "45px" }}
    />
  );
};

export default ProfileHeaderMessage;
