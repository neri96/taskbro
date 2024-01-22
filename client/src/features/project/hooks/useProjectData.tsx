import { useLocation } from "react-router-dom";

import { useGetOneProjectQuery } from "../../../app/services/project";

const useProjectData = () => {
  const location = useLocation();

  const projectUid = location.pathname.split("/")[2];

  const { data, isLoading, error } = useGetOneProjectQuery(projectUid);

  return { data, isLoading, error };
};

export default useProjectData;
