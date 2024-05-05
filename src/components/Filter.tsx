import React, { useEffect, useState } from 'react'
import AutoCompleteDropdown from '../utils/auto-complete/AutoCompleteDropdown';
import {  locationList, minExp, rolesList } from '../utils/fakeData';
import Textfield from '../utils/textfields/Textfield';
import useDeviceType from '../utils/DeviceType';

interface FilterProps {
    handleFilterData: (filter:any) => void;
}

const Filter = ({ handleFilterData }: FilterProps) => {
  const deviceType = useDeviceType();
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

    useEffect(() => {
      handleFilterData(filterData);
  }, [filterData]);

  return (
    <div style={{ margin: deviceType ==='mobile'? '20px 10px': "20px", display: deviceType==='mobile'? 'grid': "flex", gridTemplateColumns:'1fr 1fr', gap: deviceType==='mobile'?'15px': "20px" }}>
      <AutoCompleteDropdown
        multiple={false}
        placeholder="Min experience"
        listData={minExp}
        onChange={(value) => {
          handleFilterChange("minExp", value);
        }}
      />
      <AutoCompleteDropdown
        multiple={false}
        placeholder="Roles"
        listData={rolesList}
        onChange={(value) => {
          handleFilterChange("roles", value);
        }}
      />
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
