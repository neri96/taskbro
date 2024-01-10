import { ReactNode } from "react";

import useUserData from "../hooks/useUserData";

interface IUsers {
  allowedUsers?: string[];
  excluded?: string;
}

interface IProps extends IUsers {
  children: ReactNode;
}

const Protected = ({ excluded, allowedUsers, children }: IProps) => {
  const { id: myId } = useUserData() || {};

  if (excluded === myId) return null;

  return !allowedUsers
    ? children
    : allowedUsers.includes(myId)
    ? children
    : null;
};

export default Protected;
