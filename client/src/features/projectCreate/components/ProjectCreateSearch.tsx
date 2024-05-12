import {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useLazySearchQuery } from "../../../app/services/user";

import useUserData from "../../../hooks/useUserData";
import useThrottle from "../../../hooks/useThrottle";

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
  const { favorites: myFavs } = useUserData();

  const [userName, setUserName] = useState<string>("");
  const throttledValue = useThrottle(userName.length >= 3 ? userName : "");

  const [searchUsers, { data }] = useLazySearchQuery();

  useEffect(() => {
    searchUsers(throttledValue);
  }, [throttledValue]);

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
        users={throttledValue.length >= 3 ? data : myFavs}
        target={team.map((member) => {
          const { id } = member;

          return id;
        })}
        handleModify={(user: IUserList) => {
          setTeam(() => {
            const isMember = team.some(({ id }) => id === user.id);

            return isMember
              ? team.filter((current) => current.id !== user.id)
              : [...team, user];
          });
        }}
      />
    </div>
  );
};

export default ProjectCreateSearch;
