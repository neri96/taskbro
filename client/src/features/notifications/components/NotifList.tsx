import { useEffect } from "react";

import { motion } from "framer-motion";

import { useReadNotifsMutation } from "../../../app/services/notification";

import AnimElement from "../../../components/AnimElement";
import NotifDetails from "./NotifDetails";
import Loading from "../../../components/Loading";

import styles from "./NotifList.module.scss";

import { INotif } from "../../../app/services/notification";

const NotifList = ({
  userId,
  data,
  isLoading,
  isNotifOpen,
  handleToggleNotif,
}: {
  userId: string;
  data: INotif[] | undefined;
  isLoading: boolean;
  isNotifOpen: boolean;
  handleToggleNotif: () => void;
}) => {
  const [readNotifs] = useReadNotifsMutation();

  useEffect(() => {
    if (isNotifOpen && data) {
      const notReadIds = data.reduce(
        (result: string[], { id, readBy }: INotif): string[] => {
          return readBy.includes(userId) ? result : [...result, id];
        },
        []
      );

      (async () => {
        if (notReadIds.length) await readNotifs({ notReadIds, userId });
      })();
    }
  }, [isNotifOpen]);

  return (
    <AnimElement
      isOpen={isNotifOpen}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        cursor: "pointer",
        height: "100%",
        width: "100%",
        zIndex: 100,
        backgroundColor: `rgba(0, 0, 0, 0.7)`,
      }}
      handleClick={handleToggleNotif}
    >
      <motion.aside
        initial={{ x: 350 }}
        animate={{ x: 0 }}
        exit={{ x: 350 }}
        transition={{ delay: 0.3, stiffness: 0 }}
        className={styles.notifList}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={styles.notifListHeader}>
              <h4>Notifications</h4>
            </div>
            {data ? (
              <ul>
                {data?.map((notif: INotif) => {
                  return <NotifDetails key={notif.id} data={notif} />;
                })}
              </ul>
            ) : (
              <span>No notifications yet</span>
            )}
          </>
        )}
      </motion.aside>
    </AnimElement>
  );
};

export default NotifList;
