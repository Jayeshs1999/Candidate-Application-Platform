import React, { useEffect, useState } from 'react'
import AutoCompleteDropdown from '../utils/auto-complete/AutoCompleteDropdown';
import { MinBasePay, minExp, remoteList, rolesList } from '../utils/fakeData';

interface FilterProps {
    handleFilterData: (filter:any) => void;
}

const Filter = ({ handleFilterData }: FilterProps) => {
  const [filterData, setFilterData] = useState({
    minExp: [],
    remote: [],
    roles: [],
    minBasePay: null,
  });
  // Function to handle filter change
  const handleFilterChange = (filterName: string, value: any) => {
    setFilterData((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };
//   console.log("filterData:", filterData);

    useEffect(() => {
      handleFilterData(filterData);
  }, [filterData]);

  return (
    <div style={{ margin: "20px", display: "flex", gap: "20px" }}>
      <AutoCompleteDropdown
        multiple={false}
        placeholder="Min experience"
        listData={minExp}
        onChange={(value) => {
          handleFilterChange("minExp", value);
          //   setFilterData((prev: any) => ({ ...prev, minExp: value.label }));
          // handleFilterChange('minExp')
        }}
      />
      <AutoCompleteDropdown
        multiple={false}
        placeholder="Roles"
        listData={rolesList}
        onChange={(value) => {
          //   console.log("v", value);
          handleFilterChange("roles", value);
        }}
      />
      {/* <AutoCompleteDropdown placeholder="Location" listData={minExp} /> */}
      <AutoCompleteDropdown
        multiple={true}
        placeholder="Remote/on-site"
        listData={remoteList}
        onChange={(value) => {
          // console.log("v", value);
          handleFilterChange("remote", value);
        }}
      />
      {/* <AutoCompleteDropdown placeholder="Tech stack" listData={minExp} /> */}

      <AutoCompleteDropdown
        multiple={false}
        placeholder="Min base pay"
        listData={MinBasePay}
        onChange={(value) => {
          // console.log("v1", value);
          handleFilterChange("minBasePay", value);
        }}
      />
    </div>
  );
};

export default Filter
