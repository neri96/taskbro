import { INotif } from "../../../app/services/notification";

import styles from "./NotifDetails.module.scss";

const NotifDetails = ({ data }: { data: INotif }) => {
  const { message } = data;

  return <div className={styles.notifDetails}>{message}</div>;
};

export default NotifDetails;
