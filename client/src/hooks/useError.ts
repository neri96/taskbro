import { useState } from "react";

const useError = () => {
  const [serverError, setServerError] = useState<string>("");

  return { serverError, setServerError };
};

export default useError;
