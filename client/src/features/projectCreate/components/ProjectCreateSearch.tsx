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
import UserList from "../../../components/UserList";

import styles from "./ProjectCreateSearch.module.scss";
import { ITeamLocal } from "./ProjectCreateWizard";

const ProjectCreateSearch = ({
  team,
  setTeam,
  style,
  handlePrev,
}: {
  team: ITeamLocal[];
  setTeam: Dispatch<SetStateAction<ITeamLocal[]>>;
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
      <UserList
        users={data}
        target={team.map((member) => {
          const { id } = member;

          return id;
        })}
        handleModify={(data: { id: string; name: string }) =>
          setTeam((team) => [...team, data])
        }
      />
    </div>
  );
};

export default ProjectCreateSearch;
