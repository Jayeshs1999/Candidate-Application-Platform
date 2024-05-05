// jobsActions.js
import { setJobList } from "../slices/jobSlice";

export const fetchJobs = (limit, offset) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, offset }),
      }
    );
    const data = await response.json();
    dispatch(setJobList(data));
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};
