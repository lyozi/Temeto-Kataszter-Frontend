import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import DeceasedFetching from '../Fetching/DeceasedFetching';
import SearchBar from './SearchBar/SearchBar';
import DeceasedMessages from './DeceasedMessages';

const DeceasedList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [birthYearAfterFilter, setBirthYearAfterFilter] = useState<number>(0);
  const [deceaseYearBeforeFilter, setDeceaseYearBeforeFilter] = useState<number>(9999);
  const [orderBy, setOrderBy] = useState<string>("name-asc");
  const [isDeceasedMessagesSelected, setIsDeceasedMessagesSelected] = useState<boolean>(false);

  const handleNameFilter = (query: string) => {
    console.log("Search query:", query);
    setNameFilter(query);
  };

  const handleBirthYearFilter = (year: number) => {
    console.log("Filter:", year);
    if (!isNaN(year)) {
      setBirthYearAfterFilter(year);
    }
    else {
      setBirthYearAfterFilter(9999);
    }
  };

  const handleDeceaseYearFilter = (year: number) => {
    console.log("Filter:", year);
    const parsedYear = year;
    if (!isNaN(parsedYear)) {
      setDeceaseYearBeforeFilter(parsedYear);
    }
    else {
      setDeceaseYearBeforeFilter(0);
    }
  };

  const handleSort = (sortBy: string) => {
    console.log("Sort by:", sortBy);
    setOrderBy(sortBy);
  };

  const handleDeceasedMessagesSelected = (deceasedId?: number) => {
    setIsDeceasedMessagesSelected(true);
    console.log("Selected id:", deceasedId);
  };

  return (
    <Box marginBottom="1%" marginTop="1%" marginLeft="0">
      <Flex direction="row">
        <Flex
          display={{
            base: isDeceasedMessagesSelected ? "none" : "flex",
            md: "flex"
          }}
          direction="column"
          alignItems="center"
          width={isDeceasedMessagesSelected ? "27%" : "100%"}
        >
          <SearchBar
            onNameFilter={handleNameFilter}
            onBirthYearFilter={handleBirthYearFilter}
            onDeceaseYearFilter={handleDeceaseYearFilter}
            onSort={handleSort}
            isDeceasedMessagesSelected={isDeceasedMessagesSelected}
          />

          <DeceasedFetching
            searchParams={{
              name: nameFilter,
              birthYearAfter: birthYearAfterFilter,
              deceaseYearBefore: deceaseYearBeforeFilter,
              orderBy: orderBy
            }}
            handleDeceasedMessagesSelected={handleDeceasedMessagesSelected}
            isDeceasedMessagesSelected={isDeceasedMessagesSelected}
          />
        </Flex>
        <DeceasedMessages />
      </Flex >
    </Box >
  );
};

export default DeceasedList;
