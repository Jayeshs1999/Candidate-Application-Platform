// store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice";

export default configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
