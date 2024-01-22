import { useState } from "react";

import useProjectData from "../hooks/useProjectData";

import ProjectHeader, { Pages } from "./ProjectHeader";
import ProjectChat from "./ProjectChat";
import ProjectData from "./ProjectData";
import ProjectFiles from "./ProjectFiles";
import ProjectTeam from "./ProjectTeam";

import styles from "./ProjectContainer.module.scss";

import { ProjectTaskChatCtx } from "../../../context";

export const ProjectContainer = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Tasks);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const { data: projectData, isLoading, error } = useProjectData();

  if (isLoading || !projectData) return <h4>Loading...</h4>;

  return (
    <>
      <ProjectHeader setCurrentPage={setCurrentPage} />
      <div className={styles.product}>
        <div className={styles.productContent}>
          {currentPage === Pages.Tasks ? (
            <ProjectTaskChatCtx.Provider
              value={{
                isChatOpen,
                handleChatVisib: () => setIsChatOpen((prevState) => !prevState),
              }}
            >
              <ProjectData data={projectData} />
            </ProjectTaskChatCtx.Provider>
          ) : currentPage === Pages.Files ? (
            <ProjectFiles data={projectData} />
          ) : currentPage === Pages.Team ? (
            <ProjectTeam data={projectData.team} />
          ) : null}
        </div>
        <ProjectChat
          chatId={projectData.chat}
          isChatOpen={isChatOpen}
          handleChatVisib={() => setIsChatOpen((prevState) => !prevState)}
        />
      </div>
    </>
  );
};

export default ProjectContainer;
