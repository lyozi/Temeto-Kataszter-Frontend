import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import DeceasedFetching, { DeceasedMessagesFetching } from '../Fetching/DeceasedFetching';
import SearchBar from './SearchBar/SearchBar';
import AddMessageForm from './AddMessageForm';

import sir1 from '../Pictures/sir1.jpg';

const DeceasedList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [birthYearAfterFilter, setBirthYearAfterFilter] = useState<number>(0);
  const [deceaseYearBeforeFilter, setDeceaseYearBeforeFilter] = useState<number>(9999);
  const [orderBy, setOrderBy] = useState<string>("name-asc");
  const [isDeceasedMessagesSelected, setIsDeceasedMessagesSelected] = useState<boolean>(false);
  const [selectedDeceasedId, setSelectedDeceasedId] = useState<number>(0);

  const messagesEndComponent = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndComponent.current) {
      messagesEndComponent.current.scrollIntoView({ behavior: "instant" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isDeceasedMessagesSelected, selectedDeceasedId]);

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

  const handleDeceasedMessagesSelected = (deceasedId: number) => {
    setSelectedDeceasedId(deceasedId);
    setIsDeceasedMessagesSelected(true);
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
  };

  return (
    <Box paddingTop="1vh" marginLeft="0" h={{ base: "94vh", md: "87.8vh" }} pl="10%" pr="10%" 
    overflowY="auto">
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

          <Flex direction="row" height="93.6%">
            <Box
              background='gray.100'
              borderWidth='3px'
              borderRadius='lg'
              borderColor='gray.800'
              height="100%"
              width="70%"
              padding="2%"
              overflowY="auto"
            >
              <DeceasedMessagesFetching id={selectedDeceasedId} />

              <Box height="0px" ref={messagesEndComponent}></Box>

            </Box>

            <Image src={sir1} w="30%" height="50%" />
          </Flex>

          <Button
            onClick={handleScrollToBottom}
            position="absolute"
            bottom="7%"
            left="27.5%"
            bg="gray.800"
            borderRadius="full"
            aria-label="Scroll to bottom"
            _hover={{
              bg: "gray.600"
            }}
          >
            <ArrowDownIcon boxSize="30px" color="gray.200" />
          </Button>

          <Box height="4%">
            <AddMessageForm id={selectedDeceasedId}></AddMessageForm>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DeceasedList;
