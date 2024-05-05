import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./store/actions/jobActions";
import JobCard from "./utils/JobCard";
import AutoCompleteDropdown from "./utils/auto-complete/AutoCompleteDropdown";
import { MinBasePay, minExp, remoteList, rolesList } from "./utils/fakeData";

function App() {
  const dispatch = useDispatch();
  const jobList = useSelector((state: any) => state?.jobs.jobList);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<any>(null);
  const [allJobs, setAllJobs] = useState<any>(jobList?.jdList);

  useEffect(() => {
    dispatch<any>(fetchJobs(10, 0)); // Fetch initial jobs
  }, [dispatch]);

  useEffect(() => {
    function handleScroll() {
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100 &&
        !loading
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    if (page > 0) {
      dispatch<any>(fetchJobs(10, page * 10));
      setAllJobs((prev:any) => [...prev, jobList?.jdList]);
      setLoading(false);
    }
  }, [page, dispatch]);

 useEffect(() => {
  if (jobList && jobList.jdList) {
    setAllJobs((prev:any) => {
      if (prev === undefined) {
        return [...jobList.jdList];
      } else {
        return [...prev, ...jobList.jdList];
      }
    });
  }
 }, [jobList]);
  
  
  return (
    <div className="App">
      <div style={{ margin: "20px", display: "flex", gap: "20px" }}>
        <AutoCompleteDropdown
          multiple={false}
          placeholder="Min experience"
          listData={minExp}
          onChange={(value) => {
            console.log("v", value);
          }}
        />
        {/* <AutoCompleteDropdown placeholder="Location" listData={minExp} /> */}
        <AutoCompleteDropdown
          multiple={true}
          placeholder="Remote/on-site"
          listData={remoteList}
          onChange={(value) => {
            console.log("v", value);
          }}
        />
        {/* <AutoCompleteDropdown placeholder="Tech stack" listData={minExp} /> */} 
        <AutoCompleteDropdown
          multiple={true}
          placeholder="Roles"
          listData={rolesList}
          onChange={(value) => {
            console.log("v", value);
          }}
        />
        <AutoCompleteDropdown
          multiple={false}
          placeholder="Min base pay"
          listData={MinBasePay}
          onChange={(value) => {
            console.log("v1", value);
          }}
        />
      </div>
      <div
        ref={containerRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "25px",
          margin: "20px",
        }}
      >
        {allJobs?.map((job: any, index: number) => (
          <JobCard key={index} job={job} />
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
