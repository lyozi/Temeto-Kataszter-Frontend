import React from 'react';
import DisplayGraves from '../Fetching/GraveFetching'; 
import SearchBar from './SearchBar';

const GraveList: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilter = (filter: string) => {
    console.log("Filter:", filter);
  };

  const handleSort = (sortBy: string) => {
    console.log("Sort by:", sortBy);
  };

  return (
    <div>
      <SearchBar 
        onSearch={handleSearch} 
        onFilter={handleFilter} 
        onSort={handleSort} 
      />
      <DisplayGraves />
    </div>
  );
};

export default GraveList;
