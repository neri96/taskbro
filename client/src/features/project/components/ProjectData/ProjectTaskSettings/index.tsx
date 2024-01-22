import { isMobile } from "react-device-detect";

import { IProjectEdit } from "../../../../../app/services/project";

import ProjectTaskChatIcon from "./ProjectTaskChatIcon";
import ProjectTaskDescr from "./ProjectTaskDescr";
import ProjectTaskEdit from "./ProjectTaskEdit";

import styles from "./style.module.scss";

const ProjectTaskSettings = ({
  id,
  title,
  deadline,
  description,
}: {
  id: string;
} & IProjectEdit) => {
  return (
    <div className={styles.ptSettings}>
      <ul className={styles.ptSettingsList}>
        {isMobile ? (
          <li className={styles.ptSettingsItem}>
            <ProjectTaskChatIcon />
          </li>
        ) : null}
        <li className={styles.ptSettingsItem}>
          <ProjectTaskDescr description={description} />
        </li>
        <li className={styles.ptSettingsItem}>
          <ProjectTaskEdit
            id={id}
            title={title}
            deadline={deadline}
            description={description}
          />
        </li>
      </ul>
    </div>
  );
};

export default ProjectTaskSettings;
