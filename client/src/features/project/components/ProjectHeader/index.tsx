import { useState, Dispatch, SetStateAction } from "react";
import classnames from "classnames";

import ProjectHeaderUnderline from "./ProjectHeaderUnderline";

import { v4 as uuid } from "uuid";

import styles from "./style.module.scss";

export enum Pages {
  Tasks = "tasks",
  Files = "files",
  Team = "team",
}

interface IPageData {
  id: string;
  title: string;
  value: Pages;
}

const data: IPageData[] = [
  { id: uuid(), title: "tasks", value: Pages.Tasks },
  { id: uuid(), title: "files", value: Pages.Files },
  { id: uuid(), title: "team", value: Pages.Team },
];

const ProjectHeader = ({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className={styles.projectHeader}>
      <div className={styles.projectHeaderList}>
        <ul>
          {data.map(({ id, title, value }: IPageData, i: number) => {
            return (
              <li
                key={id}
                className={classnames({ [styles.chosen]: currentIndex === i })}
                onClick={() => {
                  setCurrentIndex(i);
                  setCurrentPage(value);
                }}
              >
                <h3>{title}</h3>
              </li>
            );
          })}
        </ul>
        <ProjectHeaderUnderline
          currentIndex={currentIndex}
          navLength={data.length}
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
