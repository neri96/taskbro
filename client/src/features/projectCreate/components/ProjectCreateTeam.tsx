import { Dispatch, SetStateAction, CSSProperties } from "react";

import UserList, { IUserList } from "../../../components/UserList";
import Prev from "../shared/Prev";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";

import IcAdd from "../../../assets/icons/add2.svg";

import styles from "./ProjectCreateTeam.module.scss";

const ProjectCreateTeam = ({
  team,
  setTeam,
  style,
  handlePrev,
  handleNext,
}: {
  team: IUserList[];
  setTeam: Dispatch<SetStateAction<IUserList[]>>;
  style: CSSProperties;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <div style={style}>
      <Prev handleClick={handlePrev} />
      <div className={styles.pcTeamHeader}>
        <h4>Team</h4>
      </div>
      <div className={styles.pcTeamBody}>
        {team.length ? (
          <UserList
            users={team}
            target={team.map((member) => {
              const { id } = member;

              return id;
            })}
            handleModify={({ id, name, nickname, image }: IUserList) =>
              setTeam((team) => {
                if (team.find((member) => member.id === id)) {
                  return team.filter(({ id: currentId }) => currentId !== id);
                }

                return [...team, { id, name, nickname, image }];
              })
            }
          />
        ) : (
          <div className={styles.pcTeamNull}>No team members at the moment</div>
        )}
      </div>
      <div className={styles.pcTeamFooter}>
        <Button style={{ borderRadius: "50%" }} handleClick={handleNext}>
          <Icon src={IcAdd} alt="Add more team members" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCreateTeam;
