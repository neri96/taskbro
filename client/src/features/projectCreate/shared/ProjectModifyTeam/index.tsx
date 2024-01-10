import { IUser } from "../../../../shared/interfaces/user.interface";

const ProjectModifyTeam = ({ users }: { users: IUser[] }) => {
  return (
    <div>
      <ul>
        {users?.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </div>
  );
};

export default ProjectModifyTeam;
