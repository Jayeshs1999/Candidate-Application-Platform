import React from "react";
import JobCard from "../utils/JobCard";

function JobList({ jobs }: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "25px",
        margin: "20px",
      }}
    >
      {jobs?.map((job: any, index: number) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
}

export default JobList;
