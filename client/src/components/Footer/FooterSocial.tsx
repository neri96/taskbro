import { ReactNode } from "react";

import Icon from "../Icon";

import IcFb from "../../assets/icons/social/fb.svg";
import IcLinkedin from "../../assets/icons/social/linkedin.svg";
import IcInstagram from "../../assets/icons/social/instagram.svg";
import IcX from "../../assets/icons/social/x.svg";

import styles from "./FooterSocial.module.scss";

const FooterSocial = () => {
  const iconStyle = { height: "45px" };

  const icons = [
    {
      title: "Facebook page",
      icon: IcFb,
      profileLink: "https://www.facebook.com/",
    },
    {
      title: "Linkedin page",
      icon: IcLinkedin,
      profileLink: "https://www.linkedin.com/",
    },
    {
      title: "Instagram page",
      icon: IcInstagram,
      profileLink: "https://www.instagram.com/",
    },
    {
      title: "Twitter / X page",
      icon: IcX,
      profileLink: "https://www.twitter.com/",
    },
  ];

  const SocialIcon = ({
    profileLink,
    children,
  }: {
    profileLink: string;
    children: ReactNode;
  }) => {
    return (
      <a href={profileLink} target="_blank">
        {children}
      </a>
    );
  };

  return (
    <ul className={styles.mfIcons}>
      {icons.map(({ title, icon, profileLink }) => (
        <li key={title}>
          <SocialIcon profileLink={profileLink}>
            <Icon src={icon} alt={title} style={iconStyle} />
          </SocialIcon>
        </li>
      ))}
    </ul>
  );
};

export default FooterSocial;
