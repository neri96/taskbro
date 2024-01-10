import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  ChangeEvent,
} from "react";

import { v4 as uuid } from "uuid";

import { AnimatePresence, motion } from "framer-motion";

import Input from "../../../components/Input";
import Icon from "../../../components/Icon";

import IcAdd from "../../../assets/icons/add2.svg";
import IcDelete from "../../../assets/icons/delete.svg";
import IcArrow from "../../../assets/icons/arrow.svg";

import styles from "./ProjectCreateList.module.scss";

import { ITaskLocal } from "./ProjectCreateForm";

const ProjectCreateList = ({
  tasks,
  setTasks,
}: {
  tasks: ITaskLocal;
  setTasks: Dispatch<SetStateAction<ITaskLocal>>;
}) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const addTask = () => {
    setTasks((tasks) => {
      return {
        ...tasks,
        current: "",
        list: [...tasks.list, { id: uuid(), task: tasks.current }],
      };
    });
  };

  const deleteTask = (id: string) => {
    const list = tasks.list.filter(({ id: currentId }) => id !== currentId);

    setTasks((tasks) => ({ ...tasks, list }));
  };
  console.log(tasks);

  return (
    <div className={styles.pcFormTasks}>
      <Input
        label="Tasks"
        name="tasks"
        style={{ paddingRight: "30px" }}
        icon={tasks.current ? IcAdd : null}
        iconOnClick={addTask}
        error={tasks.error}
        value={tasks.current}
        handleChange={(
          e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setTasks((tasks) => ({ ...tasks, current: e.target.value }))}
        handleKeyDown={(e: KeyboardEvent) => e.key === "Enter" && addTask()}
      >
        <AnimatePresence>
          {isListOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.pcFormList}
            >
              {tasks.list.length ? (
                <ul>
                  {tasks.list.map(({ id, task }) => {
                    return (
                      <li key={id}>
                        <span>{task}</span>
                        <Icon
                          style={{ height: "18px" }}
                          src={IcDelete}
                          alt="Delete"
                          handleClick={() => deleteTask(id)}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.pcListEmpty}>
                  <h4>Task list is empty</h4>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Input>
      <Icon
        src={IcArrow}
        alt={isListOpen ? "Close" : "Open"}
        style={{
          marginTop: "17px",
          marginRight: "20px",
          transform: `${isListOpen ? "rotate(180deg)" : "rotate(0)"}`,
          transition: "300ms",
        }}
        handleClick={() => {
          setIsListOpen((isListOpen) => !isListOpen);
          setTasks((prevState) => ({ ...prevState, error: "" }));
        }}
      />
    </div>
  );
};

export default ProjectCreateList;
