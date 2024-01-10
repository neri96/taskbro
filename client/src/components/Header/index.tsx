import { Link } from "react-router-dom";

import UserImage from "../UserImage";
import ProjectCreate from "../../features/projectCreate/components/ProjectCreate";
import LogOut from "./LogOut";

import MainIcon from "../../assets/main-icon.svg";

import useUserData from "../../hooks/useUserData";

import styles from "./style.module.scss";

const Header = () => {
  const { isAuth } = useUserData();

  const { name, nickname, image } = useUserData() || {};

  return (
    <header className={styles.mainHeader}>
      <Link to="/">
        <div className={styles.mainHeaderIcon}>
          <img src={MainIcon} alt="Main" />
          <h1>Task Bro</h1>
        </div>
      </Link>
      {isAuth ? (
        <nav className={styles.mainHeaderNav}>
          <ul className={styles.mainHeaderList}>
            <li className={styles.mainHeaderItem}>
              <UserImage
                src={image}
                alt={name}
                link={`/user/${nickname}`}
                round
                style={{ height: "35px", width: "35px" }}
              />
            </li>
            <li className={styles.mainHeaderItem}>
              <ProjectCreate />
            </li>
            <li className={styles.mainHeaderItem}>
              <LogOut />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
