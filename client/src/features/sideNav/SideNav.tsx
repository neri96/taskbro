import { useState } from "react";

import SideNavProj from "./SideNavProj";
import CloseSidebar from "../../components/CloseSidebar";
import Icon from "../../components/Icon";

import classNames from "classnames";

import IcSidebar from "../../assets/icons/sidebar.svg";

import styles from "./SideNav.module.scss";

const SideNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  return (
    <>
      <CloseSidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebar={toggleSidebar}
        style={{ left: "200px" }}
      />
      <Icon
        src={IcSidebar}
        alt="Sidebar"
        handleClick={toggleSidebar}
        style={{
          position: "absolute",
          left: "5px",
          top: "5px",
          background: "#333",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <aside
        className={classNames(styles.sideNav, {
          [styles.sideBarOpen]: isSidebarOpen,
        })}
      >
        <ul>
          <li className={styles.sideNavOption}>
            <SideNavProj />
          </li>
          {/* To be implemented in the future */}

          {/* 
        <li className={styles.sideNavOption}>
          <Icon src={IcAnalytics} style={iconStyle} alt="Analytics" />
          <h4>Analytics</h4>
        </li> */}
        </ul>
      </aside>
    </>
  );
};

export default SideNav;
