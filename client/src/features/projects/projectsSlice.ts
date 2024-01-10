import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export enum ProjectFilter {
  All = 10,
  MyProjects = 2,
  Completed = 1,
  Cancelled = 0,
}

const initialState = {
  filter: ProjectFilter.All,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const value = action.payload;

      state.filter = value;
    },
  },
});

export const { setFilter } = projectsSlice.actions;

export default projectsSlice.reducer;

export const selectFilter = (state: RootState) => state.projects.filter;
