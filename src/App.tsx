import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./store/actions/jobActions";
import JobCard from "./utils/JobCard";

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
