import { useContext } from "react";

import classnames from "classnames";

import Icon from "../../../../components/Icon";

import IcImg from "../../../../assets/icons/files/img.svg";
import IcMsWord from "../../../../assets/icons/files/msword.svg";
import IcMsExcel from "../../../../assets/icons/files/msexcel.svg";
import IcMsPowerPoint from "../../../../assets/icons/files/ppt.svg";
import IcTxt from "../../../../assets/icons/files/txt.svg";
import IcPdf from "../../../../assets/icons/files/pdf.svg";
import IcOther from "../../../../assets/icons/files/unknown.svg";

import { ProjectFileCtx } from "../../../../context";

import styles from "./ProjectFileDetails.module.scss";

import { IFile } from "../../../../app/services/project";

export enum FileType {
  Img,
  MsWord,
  MsExcel,
  MsPowerPoint,
  Pdf,
  Txt,
  Default,
}

const fileTypes = [
  { type: FileType.Img, regExp: /jpeg|jpg|webp|png|gif|svg/, icon: IcImg },
  {
    type: FileType.MsWord,
    regExp: /doc|docx|dotx|odt|rtf/,
    icon: IcMsWord,
  },
  { type: FileType.MsExcel, regExp: /xlsx|xls|xlxs|xltx/, icon: IcMsExcel },
  {
    type: FileType.MsPowerPoint,
    regExp: /xlsx|xls|xlxs|xltx/,
    icon: IcMsPowerPoint,
  },
  { type: FileType.Txt, regExp: /txt/, icon: IcTxt },
  { type: FileType.Pdf, regExp: /pdf|pdfa|pdfx/, icon: IcPdf },
  { type: FileType.Pdf, regExp: /pdf|pdfa|pdfx/, icon: IcPdf },
];

const ProjectFileDetails = ({ data }: { data: IFile }) => {
  const { selectedFile, setSelectedFile } = useContext(ProjectFileCtx);

  const { title, fileType, fileName } = data;

  const getIcon = () => {
    const fileData = fileTypes.find(({ regExp }) => regExp.test(fileType));

    if (!fileData) {
      return <Icon src={IcOther} alt="file" style={{ height: "100px" }} />;
    } else if (fileData.type === FileType.Img) {
      return <img className={styles.pfFileImg} src={fileName} alt="file" />;
    }

    return <Icon src={fileData.icon} alt="file" style={{ height: "100px" }} />;
  };

  const getContent = () => {
    return (
      <>
        <div className={styles.pfFileIcon}>{getIcon()}</div>
        <div className={styles.pfFileTitle}>{title}</div>
      </>
    );
  };

  return (
    <div
      className={classnames(styles.pfFile, {
        [styles.selected]: data.fileName === selectedFile.link,
      })}
      onClick={() =>
        setSelectedFile &&
        setSelectedFile((prevState) => ({
          ...prevState,
          link: data.fileName,
          extention: fileType,
        }))
      }
    >
      {data.fileName === selectedFile.link ? (
        <a href={fileName} download={title} target="_blank">
          {getContent()}
        </a>
      ) : (
        getContent()
      )}
    </div>
  );
};

export default ProjectFileDetails;
