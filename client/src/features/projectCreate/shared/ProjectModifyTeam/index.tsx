import { IUser } from "../../../../app/services/user";

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
