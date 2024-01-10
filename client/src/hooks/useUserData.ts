import { useTypedSelector } from "../app/store";

import { selectCurrentUserData } from "../features/auth/authSlice";

const useUserData = () => {
  const { user, ...details } = useTypedSelector(selectCurrentUserData);

  return { ...user, ...details };
};

export default useUserData;
