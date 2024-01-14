import { createContext } from "react";

export const ProjectCreateCtx = createContext<{
  toggleModal: null | (() => void);
}>({ toggleModal: null });

export const ProfileChatStatusCtx = createContext<{
  handleChatVisibility: null | (() => void);
}>({ handleChatVisibility: null });
