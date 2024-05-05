import React, { useEffect, useState } from 'react'
import AutoCompleteDropdown from '../utils/auto-complete/AutoCompleteDropdown';
import {  locationList, minExp, rolesList } from '../utils/fakeData';
import Textfield from '../utils/textfields/Textfield';

interface FilterProps {
    handleFilterData: (filter:any) => void;
}

const Filter = ({ handleFilterData }: FilterProps) => {
  const [filterData, setFilterData] = useState({
    minExp: [],
    location: [],
    roles: [],
    minBasePay: null,
    companyName: null,
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
        multiple={false}
        placeholder="Location"
        listData={locationList}
        onChange={(value) => {
          handleFilterChange("location", value);
        }}
      />
      <Textfield
        value={filterData?.companyName}
        label="Company Name"
        onChange={(value: any) => {
          handleFilterChange("companyName", value);
        }}
      />
    </div>
  );
};

export default Filter
