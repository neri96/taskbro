import SideNavProj from "./SideNavProj";
// import Icon from "../../components/Icon";

// import IcFavs from "../../assets/icons/favorites.svg";
// import IcAnalytics from "../../assets/icons/analytics.svg";

import styles from "./SideNav.module.scss";

// const iconStyle = {
//   margin: "0 7px",
// };

const SideNav = () => {
  return (
    <aside className={styles.sideNav}>
      <ul>
        <li className={styles.sideNavOption}>
          <SideNavProj />
        </li>
        {/* To be implemented in the future */}

        {/* <li className={styles.sideNavOption}>
          <Icon src={IcFavs} style={iconStyle} alt="Favorites" />
          <h4>Favorites</h4>
        </li>
        <li className={styles.sideNavOption}>
          <Icon src={IcAnalytics} style={iconStyle} alt="Analytics" />
          <h4>Analytics</h4>
        </li> */}
      </ul>
    </aside>
  );
};

export default SideNav;
