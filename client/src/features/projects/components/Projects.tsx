import { useTypedSelector } from "../../../app/store";
import { selectFilter } from "../projectsSlice";

import { useGetProjectsQuery } from "../../../app/services/project";

import ProjectDetails from "./ProjectDetails";

import styles from "./Projects.module.scss";

const Projects = () => {
  const filter = useTypedSelector(selectFilter);

  const { data } = useGetProjectsQuery(filter);

  return (
    <div className={styles.projects}>
      {data?.map((project) => {
        return <ProjectDetails key={project.id} data={project} />;
      })}
    </div>
  );
};

export default Projects;
