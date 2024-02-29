import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import DeceasedFetching from '../Fetching/DeceasedFetching';
import SearchBar from './SearchBar/SearchBar';

const DeceasedList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [birthYearAfterFilter, setBirthYearAfterFilter] = useState<number>(0);
  const [birthYearBeforeFilter, setBirthYearBeforeFilter] = useState<number>(9999);
  const [orderBy, setOrderBy] = useState<string>("name-asc");

  const handleNameFilter = (query: string) => {
    console.log("Search query:", query);
    setNameFilter(query);
  };

  const handleBirthYearFilter = (year: number) => {
    console.log("Filter:", year);
    if (!isNaN(year)) {
      setBirthYearAfterFilter(year);
    }
    else{
      setBirthYearAfterFilter(9999);
    }
  };

  const handleDeceaseYearFilter = (year: number) => {
    console.log("Filter:", year);
    const parsedYear = year;
    if (!isNaN(parsedYear)) {
      setBirthYearBeforeFilter(parsedYear);
    }
    else{
      setBirthYearAfterFilter(0);
    }
  };

  const handleSort = (sortBy: string) => {
    console.log("Sort by:", sortBy);
    setOrderBy(sortBy);
  };

  return (
    <Box p={["0.1%", "1%"]} paddingTop="1%">
      <Box display="flex" justifyContent="center" width="100%" alignContent="center">
      <Box width={{ base: "100%", md: "66%" }}>
        <SearchBar
          onNameFilter={handleNameFilter}
          onBirthYearFilter={handleBirthYearFilter}
          onDeceaseYearFilter={handleDeceaseYearFilter}
          onSort={handleSort}
        />
      </Box>
      </Box>
      <DeceasedFetching
        searchParams={{
          name: nameFilter,
          birthYearAfter: birthYearAfterFilter,
          birthYearBefore: birthYearBeforeFilter,
          orderBy: orderBy
        }}
      />
    </Box >
  );
};

export default DeceasedList;
