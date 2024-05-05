import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./store/actions/jobActions";
import JobCard from "./utils/JobCard";
import Filter from "./components/Filter";

function App() {
  const dispatch = useDispatch();
  const jobList = useSelector((state: any) => state?.jobs.jobList);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<any>(null);
  const [allJobs, setAllJobs] = useState<any>(jobList?.jdList);
  const [filterList, setFilterList] = useState<any>([])
  const [filterData, setFilterData] = useState<any>({
    minExp: [],
    remote: [],
    roles: [],
    minBasePay: null,
  });
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

    if (!isFilterApplied()) {
      window.addEventListener("scroll", handleScroll);
    } 
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
  
  const isFilterApplied = () => {    
    return (
      filterData?.minExp?.label ||
      filterData?.remote?.length > 0 ||
      filterData?.roles?.label ||
      filterData?.minBasePay !== null
    );
  };  
  console.log("filterList:",filterList)

  useEffect(() => {
    if (isFilterApplied()) {
      let filteredData = [...allJobs];
      if (filterData.minExp?.label) {
        filteredData = allJobs?.filter(
          (data: any) => data?.minExp == filterData?.minExp?.label
        );
      }
      console.log("v:", filterData?.roles?.label);
      
       if (filterData?.roles?.label) {
         filteredData = filteredData
           ? filteredData.filter(
               (data: any) =>
                 data?.jobRole == filterData?.roles?.label?.toLowerCase()
             )
           : allJobs?.filter(
               (data: any) =>
                 data?.jobRole == filterData?.roles?.label?.toLowerCase()
             );
       }
      setFilterList(filteredData);
    }
  },[filterData])


  
  
  return (
    <div className="App">
      <Filter
        handleFilterData={(filterData) => {
          setFilterData(filterData);
        }}
      />
      {!isFilterApplied() ? (
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "25px",
            margin: "20px",
          }}
        >
          {filterList?.map((job: any, index: number) => (
            <JobCard key={index} job={job} />
          ))}
          
        </div>
      )}
    </div>
  );
}

export default App;
