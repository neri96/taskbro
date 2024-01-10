import styles from "./style.module.scss";

import IcLoading from "../../assets/icons/loading.svg";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={IcLoading} alt="Loading..." />;
    </div>
  );
};

export default Loading;
