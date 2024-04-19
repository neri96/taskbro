import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface IState {
  isChatOpen: boolean;
}

const initialState = {
  isChatOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsChatOpen: (
      state: IState,
      actions: PayloadAction<boolean | undefined>
    ) => {
      if (actions.payload === undefined) {
        state.isChatOpen = !state.isChatOpen;
      } else {
        state.isChatOpen = actions.payload;
      }
    },
  },
});

export const { setIsChatOpen } = globalSlice.actions;

export default globalSlice.reducer;

export const selectChatVisibility = (state: RootState) =>
  state.global.isChatOpen;
