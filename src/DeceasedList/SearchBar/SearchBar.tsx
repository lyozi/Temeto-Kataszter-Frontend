import React, { useState } from "react";
import {
  Flex, Input, Select, Box, InputGroup, InputLeftElement, InputRightAddon, RadioGroup, Radio
  , useRadio, useRadioGroup, HStack, Button, NumberInput, NumberInputField, Text, Center, Hide, Show
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

interface Props {
  onNameFilter: (query: string) => void;
  onBirthYearFilter: (year: number) => void;
  onDeceaseYearFilter: (year: number) => void;
  onSort: (sortBy: string) => void;
  isDeceasedMessagesSelected: boolean;
}

const SearchBar: React.FC<Props> = ({ onNameFilter, onBirthYearFilter, onDeceaseYearFilter, onSort, isDeceasedMessagesSelected }) => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [birthYearFilter, setBirthYearFilter] = useState<string>("");
  const [deceaseYearFilter, setDeceaseYearFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<string>("asc")

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    onNameFilter(e.target.value);
  };

  const handleBirthYearFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*$/;
    const inputValue = e.target.value;
    if (!regex.test(inputValue)) {
      console.log("nem regex");
      return;
    }
    const parsedValue = parseInt(inputValue);
    if (parsedValue >= 0 && parsedValue < 99999) {
      setBirthYearFilter(inputValue);
      onBirthYearFilter(parsedValue);
    }
    else if (inputValue == "") {
      setBirthYearFilter("");
      onBirthYearFilter(minBirthYear);
    }
  };

  const handleDeceaseYearFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*$/;
    const inputValue = e.target.value;
    if (!regex.test(inputValue)) {
      return;
    }
    const parsedValue = parseInt(inputValue);
    if (parsedValue >= 0 && parsedValue < 99999) {
      setDeceaseYearFilter(inputValue);
      onDeceaseYearFilter(parsedValue);
    }
    else if (inputValue == "") {
      setDeceaseYearFilter("");
      onDeceaseYearFilter(maxDeceaseYear);
    }
  };

  const handleSort = (by: string, dir: string) => {
    setSortOption(by);
    if (!isMobile) {
      setSortDirection(dir);
      onSort(by + "_" + dir)
    }
    else {
      if (sortDirection == "asc") {
        setSortDirection("desc")
        onSort(by + "_" + "desc");
      }
      else {
        setSortDirection("asc")
        onSort(by + "_" + "asc");
      }
    }
  };

  const maxDeceaseYear = 99999;
  const minBirthYear = 0;

  const bgcolor = 'gray.600';
  const outlineColor = 'gray.800';
  const focusColor = "#234150";
  const textColor = 'gray.200';
  const secondTextsPaddingTop = "1%";
  const secondTextsPaddingBottom = "11%";

  const cimStyle = {
    fontSize: ["2xl", "4xl"], // Első elem a mobil nézet, második elem a desktop nézet
    fontWeight: "bold",
    height: 50,
    paddingBottom: "10%"
  };

  const RadioButtonStyle = {
    variant: "solid",
    borderWidth: '1px',
    borderColor: "black",
    borderRadius: 'md',
    boxShadow: 'md',
    size: { base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }
  };


  const rightInputGroupStyle = {
    w: { base: "35%", md: isDeceasedMessagesSelected ? "35%" : "50%" },
    fontSize: { base: "sm", md: isDeceasedMessagesSelected ? "sm" : "xl" },
    size: { base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" },
    marginLeft: 'auto'
  };

  const labelStyle = {
    w: { base: "60%", md: isDeceasedMessagesSelected ? "60%" : "50%" },
    fontSize: ["sm", "2xl"]
  }

  const isMobile = window.innerWidth <= 768;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" bg="gray.400" borderWidth='4px' borderColor={outlineColor} borderRadius='xl'
      width={{ base: "100%", md: isDeceasedMessagesSelected ? "100%" : "66%" }}>
      <Flex width="50%" flexDirection="column" p={{ base: "1%", md: isDeceasedMessagesSelected ? "1%" : "2%" }} paddingTop={{ base: "1%", md: isDeceasedMessagesSelected ? "1%" : "0.5%" }} paddingBottom={{ base: "2%", md: isDeceasedMessagesSelected ? "2%" : "1%" }}>
        <Box width="100%">
          <Box {...cimStyle}>Keresés:</Box>
          <InputGroup width="100%" alignContent='center'
            fontSize={{ base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }}
            size={{ base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }} >
            <InputLeftElement pointerEvents='none'>
              <Search2Icon color={textColor} w={{ base: "4", md: isDeceasedMessagesSelected ? "4" : "8" }} h={{ base: "4", md: isDeceasedMessagesSelected ? "4" : "8" }} />
            </InputLeftElement>
            <Input
              placeholder="Elhunyt neve"
              value={nameFilter}
              onChange={handleNameFilter}
              variant='outline'
              _placeholder={{ color: textColor }}
              color={textColor}
              outlineColor={outlineColor}
              focusBorderColor={focusColor}
              background={bgcolor}
              fontSize={rightInputGroupStyle.fontSize}
            />
          </InputGroup>
        </Box>

        <Box width="100%">
          <Box {...cimStyle} paddingTop={secondTextsPaddingTop} paddingBottom={secondTextsPaddingBottom}>Sorrendezés:</Box>
          <Flex dir="horizontal" w="100%">
            <Select
              width="50%"
              placeholder="Sorrendezés"
              value={sortOption}
              onChange={e => handleSort(e.target.value, sortDirection)}
              variant='outline'
              outlineColor='gray.800'
              focusBorderColor="#234150"
              background={bgcolor}
              color='gray.200'
              fontSize={rightInputGroupStyle.fontSize}
              size={{ base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }}
            >
              <option value="name">Név</option>
              <option value="dateofdeath">Elhalálozás dátuma</option>
              <option value="dateofbirth">Születés dátuma</option>
            </Select>

            <Flex
              outlineColor='gray.800'
              color='gray.800'
              fontSize={rightInputGroupStyle.fontSize}
              marginLeft="5%"
              width="45%"
            >
              <Button
                value="asc"
                onClick={() => handleSort(sortOption, "asc")}
                color={sortDirection === "asc" ? "white" : "gray.800"}
                bg={sortDirection === "asc" ? "gray.800" : "white"}
                {...RadioButtonStyle}
                size={{ base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }}
                _hover={{
                  bg: sortDirection === "asc" ? "gray.700" : "gray.200"
                }}
                fontSize={rightInputGroupStyle.fontSize}
              >
                Növekvő
              </Button>

              {
                !isDeceasedMessagesSelected &&
                (
                  <Show breakpoint='(min-width: 768px)'>
                    <Button
                      value="desc"
                      onClick={() => handleSort(sortOption, "desc")}
                      color={sortDirection === "desc" ? "white" : "gray.800"}
                      bg={sortDirection === "desc" ? "gray.800" : "white"}
                      _hover={{
                        bg: sortDirection === "desc" ? "gray.700" : "gray.200"
                      }}
                      {...RadioButtonStyle}
                      size={{ base: "sm", md: isDeceasedMessagesSelected ? "sm" : "lg" }}
                      marginLeft="5%"
                      fontSize={rightInputGroupStyle.fontSize}
                    >
                      Csökkenő
                    </Button>
                  </Show>
                )
              }
            </Flex>

          </Flex>
        </Box>
      </Flex >


      <Flex width="50%" p={{ base: "1%", md: isDeceasedMessagesSelected ? "1%" : "2%" }} paddingTop={{ base: "1%", md: isDeceasedMessagesSelected ? "1%" : "0.5%" }} paddingBottom={{ base: "2%", md: isDeceasedMessagesSelected ? "2%" : "1%" }} flexDirection="column">
        <Box {...cimStyle}>Szűrés:</Box>
        <Flex width="100%" flexDirection="row">
          <Box {...labelStyle}>
            Születés éve:
          </Box>
          <InputGroup {...rightInputGroupStyle}>
            <Input
              value={birthYearFilter}
              background={bgcolor}
              color={textColor}
              _placeholder={{ color: textColor }}
              variant='outline'
              focusBorderColor={focusColor}
              outlineColor={outlineColor}
              fontSize={rightInputGroupStyle.fontSize}
              onChange={handleBirthYearFilter}
            />
            <InputRightAddon display={{ base: "none", md: isDeceasedMessagesSelected ? "none" : "flex" }} alignItems="center" fontSize={rightInputGroupStyle.fontSize}>
              (után)
            </InputRightAddon>
          </InputGroup>
        </Flex>

        <Box {...cimStyle} paddingTop={secondTextsPaddingTop} paddingBottom={secondTextsPaddingBottom} />

        <Flex width="100%" flexDirection="row">
          <Box {...labelStyle}>
            Elhalálozás éve:
          </Box>
          <InputGroup {...rightInputGroupStyle}>
            <Input
              value={deceaseYearFilter}
              background={bgcolor}
              color={textColor}
              _placeholder={{ color: textColor }}
              variant='outline'
              focusBorderColor={focusColor}
              outlineColor={outlineColor}
              fontSize={rightInputGroupStyle.fontSize}
              onChange={handleDeceaseYearFilter}
            />
            <InputRightAddon display={{ base: "none", md: isDeceasedMessagesSelected ? "none" : "flex" }} alignItems="center" fontSize={rightInputGroupStyle.fontSize}>
              (előtt)
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Flex>
    </Box >
  );
};

export default SearchBar;
