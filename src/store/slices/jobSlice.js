// jobsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: [],
    filters: {
      minExperience: 0,
      company: "",
      location: "",
      remote: false,
      techStack: [],
      role: "",
      minPay: 0,
    },
  },
  reducers: {
    setJobList: (state, action) => {
      state.jobList = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setJobList, setFilters } = jobsSlice.actions;

export default jobsSlice.reducer;
