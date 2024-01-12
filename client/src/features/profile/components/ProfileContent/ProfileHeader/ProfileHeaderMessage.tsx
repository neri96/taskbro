import { isMobile } from "react-device-detect";

import Icon from "../../../../../components/Icon";

import IcMessage from "../../../../../assets/icons/message.svg";

const ProfileHeaderMessage = () => {
  return (
    <Icon
      src={IcMessage}
      alt="Message"
      style={{ height: isMobile ? "40px" : "45px" }}
    />
  );
};

export default ProfileHeaderMessage;
