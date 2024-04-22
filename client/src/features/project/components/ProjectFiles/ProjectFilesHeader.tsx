import { ChangeEvent } from "react";

import Button from "../../../../components/Button";

import useUploadFile from "../../hooks/useUploadFile";

import styles from "./ProjectFilesHeader.module.scss";

import { SelectedFile } from "../../../../ts/types";

const ProjectFilesHeader = ({
  id,
  selectedFile,
}: {
  id: string;
  selectedFile: SelectedFile;
}) => {
  const { handleUpload } = useUploadFile();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (Array.from(e.target.files).length > 3) {
        e.preventDefault();

        return;
      }

      await handleUpload(id, e.target.files);
    }
  };

  const handleDownload = () => {
    fetch(selectedFile.link, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          Date.now() + "." + selectedFile.extention
        );

        document.body.appendChild(link);

        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.pfHeader}>
      <div className={styles.pfHeaderBtn}>
        <div className={styles.pfHeaderUpload}>
          <Button>
            Upload
            <label htmlFor="upload-file" />
            <input
              id="upload-file"
              type="file"
              multiple
              onChange={handleChange}
            />
          </Button>
        </div>

        <Button disabled={!selectedFile.link} handleClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilesHeader;
