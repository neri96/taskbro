import { createContext } from "react";

export const ProjectCreateCtx = createContext<{
  toggleModal: null | (() => void);
}>({ toggleModal: null });
