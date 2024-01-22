import { useState } from "react";

import { useGetNotifsQuery } from "../../../app/services/notification";

import Icon from "../../../components/Icon";

import IcNotif from "../../../assets/icons/notif.svg";

import useUserData from "../../../hooks/useUserData";

import styles from "./Notification.module.scss";
import NotifList from "./NotifList";

const Notification = () => {
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);

  const handleToggleNotif = () => setIsNotifOpen((prevState) => !prevState);

  const { id } = useUserData() || {};
  const { data, isLoading } = useGetNotifsQuery(id, { skip: !id });

  const { notifications, notReadQty } = data || {};

  return (
    <>
      <Icon handleClick={handleToggleNotif} src={IcNotif} alt="Notifications">
        {notReadQty ? (
          <div className={styles.notifQty}>{notReadQty}</div>
        ) : null}
      </Icon>

      <NotifList
        userId={id}
        data={notifications}
        isLoading={isLoading}
        isNotifOpen={isNotifOpen}
        handleToggleNotif={handleToggleNotif}
      />
    </>
  );
};

export default Notification;
