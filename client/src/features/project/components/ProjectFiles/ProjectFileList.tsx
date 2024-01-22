import { DragEvent } from "react";

import ProjectFileDetails from "./ProjectFileDetails";

import useUploadFile from "../../hooks/useUploadFile";

import styles from "./ProjectFileList.module.scss";

import { IFile } from "../../../../app/services/project";

const ProjectFileList = ({ id, data }: { id: string; data: IFile[] }) => {
  const { handleUpload } = useUploadFile();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await handleUpload(id, e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.pfList} onDragEnter={handleDragEnter}>
      <div
        className={styles.pfListDropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {data.map((file) => {
          return <ProjectFileDetails key={file._id} data={file} />;
        })}
      </div>
    </div>
  );
};

export default ProjectFileList;
