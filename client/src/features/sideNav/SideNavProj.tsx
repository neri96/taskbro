import { useState } from "react";

import Icon from "../../components/Icon";

import IcTasks from "../../assets/icons/tasks.svg";
import IcCheck from "../../assets/icons/check2.svg";

import { useAppDispatch, useTypedSelector } from "../../app/store";
import { setFilter, selectFilter } from "../projects/projectsSlice";

import styles from "./SideNavProj.module.scss";

const options = [
  {
    id: 10,
    title: "All",
  },
  {
    id: 2,
    title: "My Projects",
  },
  {
    id: 1,
    title: "Completed",
  },
  {
    id: 0,
    title: "Cancelled",
  },
];

const SideNavProj = () => {
  const dispatch = useAppDispatch();
  const projectFilter = useTypedSelector(selectFilter);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen((prevState) => !prevState);

  return (
    <div className={styles.snProj}>
      <div className={styles.snProjTitle} onClick={handleToggle}>
        <Icon
          src={IcTasks}
          style={{
            margin: "0 7px",
          }}
          alt="Tasks"
        />
        <h4>Projects</h4>
      </div>
      <ul
        style={{ maxHeight: isOpen ? "120px" : 0 }}
        className={styles.snProjList}
      >
        {options.map(({ id, title }) => {
          return (
            <li key={id} onClick={() => dispatch(setFilter(id))}>
              <span>{title}</span>
              {projectFilter === id ? (
                <Icon
                  src={IcCheck}
                  alt="Chosen"
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNavProj;
