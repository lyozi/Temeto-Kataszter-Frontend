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
  const [selectedDeceasedId, setSelectedDeceasedId] = useState<number>(0);

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

  const handleDeceasedMessagesSelected = (deceasedId: number) => {
    setSelectedDeceasedId(deceasedId);
    setIsDeceasedMessagesSelected(true);
    console.log("Selected id:", deceasedId);
  };

  return (
    <Box paddingTop="1vh" marginLeft="0" h={{base:"94vh", md:"87.8vh"}}>
      <Flex direction="row" h="100%">
          <Flex
          width={isDeceasedMessagesSelected ? "27%" : "100%"}
            display={{
              base: isDeceasedMessagesSelected ? "none" : "flex",
              md: "flex"
            }}
            direction="column"
            alignItems="center"
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
        <Flex direction="column" width={"73%"} display={isDeceasedMessagesSelected ? "flex" : "none"}>
          <DeceasedMessages id={selectedDeceasedId}/>
        </Flex>
      </Flex >
    </Box >
  );
};

export default DeceasedList;
