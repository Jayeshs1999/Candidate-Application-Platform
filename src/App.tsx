import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./store/actions/jobActions";
import JobCard from "./utils/job-card/JobCard";
import Filter from "./components/Filter";
import useDeviceType from "./utils/DeviceType";

function App() {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();
  const jobList = useSelector((state: any) => state?.jobs.jobList);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<any>(null);
  const dummyRef = useRef<any>(null);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [filterList, setFilterList] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>({
    minExp: [],
    location: [],
    roles: [],
    minBasePay: null,
    companyName: null,
  });

  const isFilterApplied = () => {
    return (
      filterData?.minExp?.label ||
      filterData?.location?.label ||
      filterData?.roles?.label ||
      filterData?.minBasePay !== null ||
      filterData?.companyName
    );
  };

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
    if (page > 0 && !isFilterApplied()) {
      dispatch<any>(fetchJobs(10, page * 10));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (jobList && jobList.jdList) {
      setAllJobs((prev: any) => [...prev, ...jobList.jdList]);
      setLoading(false);
    }
  }, [jobList]);

  useEffect(() => {
    if (isFilterApplied()) {
      let filteredData = [...allJobs];
      if (filterData.minExp?.label) {
        filteredData = filteredData.filter(
          (data: any) => data?.minExp == filterData?.minExp?.label
        );
      }
      if (filterData?.roles?.label) {
        filteredData = filteredData.filter(
          (data: any) =>
            data?.jobRole === filterData?.roles?.label?.toLowerCase()
        );
      }
      if (filterData?.location?.label) {
        filteredData = filteredData.filter(
          (data: any) =>
            data?.location === filterData?.location?.label?.toLowerCase()
        );
      }
      if (filterData?.companyName) {
        filteredData = filteredData.filter((item: any) =>
          item?.companyName
            ?.toLowerCase()
            .includes(filterData?.companyName?.toLowerCase())
        );
      }
      setFilterList(filteredData);
    }
  }, [filterData, allJobs]);

  return (
    <div className="App">
      <div>
        <Filter
          handleFilterData={(filterData) => {
            setFilterData(filterData);
          }}
        />
      </div>

      <div
        ref={isFilterApplied() ? dummyRef : containerRef}
        style={{
          display: "grid",
          gridTemplateColumns:
            deviceType === "mobile"
              ? "1fr"
              : deviceType === "extra-large-desktop"
              ? "1fr 1fr 1fr 1fr 1fr"
              : deviceType === "desktop"
              ? "1fr 1fr 1fr 1fr"
              : deviceType === "tablet"
              ? "1fr 1fr"
              : deviceType === "small-tablet"
              ? "1fr 1fr"
              : "1fr 1fr 1fr 1fr",
          gap: "25px",
          margin: "20px",
        }}
      >
        {(isFilterApplied() ? filterList : allJobs)?.map(
          (job: any, index: number) => (
            <JobCard key={index} job={job} />
          )
        )}
      </div>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
}

export default App;
