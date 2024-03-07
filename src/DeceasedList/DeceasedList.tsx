import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import DeceasedFetching from '../Fetching/DeceasedFetching';
import SearchBar from './SearchBar/SearchBar';
import AddMessageForm from './DeceasedMessages/AddMessageForm';
import { DeceasedMessagesFetching } from '../Fetching/DeceasedMessagesFetching';

import sir1 from '../Pictures/sir1.jpg';
import { Deceased } from '../Fetching/types';
import MessagesPanel from './DeceasedMessages/MessagesPanel';

const DeceasedList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [birthYearAfterFilter, setBirthYearAfterFilter] = useState<number>(0);
  const [deceaseYearBeforeFilter, setDeceaseYearBeforeFilter] = useState<number>(9999);
  const [orderBy, setOrderBy] = useState<string>("name-asc");
  const [isDeceasedMessagesSelected, setIsDeceasedMessagesSelected] = useState<boolean>(false);
  const [selectedDeceased, setSelectedDeceased] = useState<Deceased>({ id: 0, name: '', dateOfDeath: new Date(), dateOfBirth: new Date() });


  const handleNameFilter = (query: string) => {
    setNameFilter(query);
  };

  const handleBirthYearFilter = (year: number) => {
    setBirthYearAfterFilter(year);
  };

  const handleDeceaseYearFilter = (year: number) => {
    setDeceaseYearBeforeFilter(year);
  };

  const handleSort = (sortBy: string) => {
    setOrderBy(sortBy);
  };

  const handleDeceasedMessagesSelected = (deceased: Deceased) => {
    setSelectedDeceased(deceased);
    setIsDeceasedMessagesSelected(true);
  };

  const handleClosed = () => {
    setIsDeceasedMessagesSelected(false);
  }

  return (
    <Box paddingTop="0.5vh" marginLeft="0" h={{ base: "94vh", md: "87.8vh" }} pl="10%" pr="10%" overflowY="auto">

      <Flex direction="row" h="100%" w="100%">
        <Flex
          width={isDeceasedMessagesSelected ? "27%" : "100%"}
          display={{
            base: isDeceasedMessagesSelected ? "none" : "flex",
            md: "flex"
          }}
          direction="column"
          alignItems="center"
          height="100%"
        >  {/*bal oldali resz*/}
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
        {isDeceasedMessagesSelected && (
          <Box h="100%" width="73%">  {/*jobb oldali resz*/}
            <MessagesPanel selectedDeceased={selectedDeceased} notifyClosed={handleClosed}/>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default DeceasedList;
