import { useState } from "react";

import ProjectFilesHeader from "./ProjectFilesHeader";
import ProjectFileList from "./ProjectFileList";

import { ProjectFileCtx } from "../../../../context";

import styles from "./style.module.scss";

import { IProject } from "../../../../app/services/project";
import { SelectedFile } from "../../../../ts/types";

const ProjectFiles = ({ data }: { data: IProject }) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>({
    link: "",
    extention: "",
  });

  return (
    <div className={styles.projectFiles}>
      <ProjectFilesHeader id={data.id} selectedFile={selectedFile} />
      <ProjectFileCtx.Provider value={{ selectedFile, setSelectedFile }}>
        <ProjectFileList id={data.id} data={data.files} />
      </ProjectFileCtx.Provider>
    </div>
  );
};

export default ProjectFiles;
