import { createContext } from "react";
import { SelectedFile } from "../ts/types";

export const ProjectCreateCtx = createContext<{
  toggleModal: null | (() => void);
}>({ toggleModal: null });

export const ProfileChatStatusCtx = createContext<{
  handleChatVisibility: null | (() => void);
}>({ handleChatVisibility: null });

export const ProjectDataCtx = createContext<{
  id: string;
  isProjectCompleted: boolean;
}>({ id: "", isProjectCompleted: false });

export const ProjectFileCtx = createContext<{
  selectedFile: SelectedFile;
  setSelectedFile: React.Dispatch<React.SetStateAction<SelectedFile>> | null;
}>({
  selectedFile: { link: "", extention: "" },
  setSelectedFile: null,
});

export const ProjectPastDueCtx = createContext(false);

export const ProjectTaskChatCtx = createContext<{
  isChatOpen: boolean;
  handleChatVisib: null | (() => void);
}>({
  isChatOpen: false,
  handleChatVisib: null,
});
