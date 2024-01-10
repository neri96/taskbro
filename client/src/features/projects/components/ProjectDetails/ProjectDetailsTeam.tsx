import ProjectDetailsMember from "./ProjectDetailsMember";

import styles from "./ProjectDetailsTeam.module.scss";

export interface ITeamMember {
  id: string;
  nickname: string;
  name: string;
  image: string | undefined;
}

const ProjectDetailsTeam = ({ data }: { data: ITeamMember[] }) => {
  return (
    <div className={styles.projectDetailsTeam}>
      <ul>
        {data.map((member: ITeamMember, index: number) => {
          return (
            <ProjectDetailsMember key={member.id} data={{ ...member, index }} />
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectDetailsTeam;
