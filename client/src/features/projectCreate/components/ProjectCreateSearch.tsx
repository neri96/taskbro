import {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useLazySearchQuery } from "../../../app/services/user";

import Prev from "../shared/Prev";
import Input from "../../../components/Input";
import UserList, { IUserList } from "../../../components/UserList";

import styles from "./ProjectCreateSearch.module.scss";

const ProjectCreateSearch = ({
  team,
  setTeam,
  style,
  handlePrev,
}: {
  team: IUserList[];
  setTeam: Dispatch<SetStateAction<IUserList[]>>;
  style: CSSProperties;
  handlePrev: () => void;
}) => {
  const [userName, setUserName] = useState<string>("");

  const [searchUsers, { data }] = useLazySearchQuery();

  useEffect(() => {
    if (userName.length >= 2) {
      searchUsers(userName);
    }
  }, [userName]);

  return (
    <div style={style}>
      <Prev handleClick={handlePrev} />

      <div className={styles.pcSearchHeader}>
        <Input
          name="search-name"
          placeholder="Search for a new Team member"
          value={userName}
          handleChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setUserName(e.target.value)}
        />
      </div>
      {data ? (
        <UserList
          users={data}
          target={team.map((member) => {
            const { id } = member;

            return id;
          })}
          handleModify={(input: IUserList) =>
            setTeam((team) => [...team, input])
          }
        />
      ) : null}
    </div>
  );
};

export default ProjectCreateSearch;
