import Icon from "../../../components/Icon";

import IcBack from "../../../assets/icons/back.svg";

const Prev = ({ handleClick }: { handleClick: () => void }) => {
  return <Icon src={IcBack} alt="Get Back" handleClick={handleClick} />;
};

export default Prev;
