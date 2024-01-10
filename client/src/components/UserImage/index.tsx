import { CSSProperties, useState } from "react";

import Tooltip from "../Tooltip";

import ImgProfilePic from "../../assets/generic-pp.png";

import styles from "./style.module.scss";
import { Link } from "react-router-dom";

interface ITooltip {
  content: string;
}

const UserImage = ({
  src,
  alt,
  link,
  round,
  toolTip,
  style,
}: {
  src: string | undefined;
  alt: string;
  link?: string;
  round?: boolean;
  toolTip?: ITooltip;
  style?: CSSProperties;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsTooltipOpen((prevState) => !prevState);
  };

  const content = (
    <div
      style={style}
      className={styles.userImage}
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
    >
      <img
        style={{
          height: "100%",
          objectFit: "cover",
          borderRadius: round ? "50%" : "5px",
        }}
        src={src || ImgProfilePic}
        alt={alt}
      />

      {toolTip ? (
        <Tooltip isOpen={isTooltipOpen}>{toolTip.content}</Tooltip>
      ) : null}
    </div>
  );

  return link ? (
    <Link to={link} className={styles.userImageLink}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default UserImage;
