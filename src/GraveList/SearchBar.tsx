import React, { useState } from "react";
import {
  Flex, Input, Select, Box, InputGroup, InputLeftElement, InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

interface Props {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onSort: (sortBy: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, onFilter, onSort }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
    onFilter(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
  };

  const handleAllSearch = () => {

  }

  const bgcolor = 'gray.600';
  const outlineColor = 'gray.800';
  const focusColor = "#234150";
  const textColor = 'gray.200';
  const secondTextsPaddingTop = "1%";

  const cimStyle = {
    fontSize: ["2xl", "4xl"], // Első elem a mobil nézet, második elem a desktop nézet
    fontWeight: "bold",
    height: 50,
    paddingBottom: "8%"
  };

  const rightInputGroupStyle = {
    w: { base: "30%", md: "70%" },
    fontSize: { base: "sm", md: "2xl" },
    size: { base: "sm", md: "lg" },
    marginLeft: 'auto'
  }

  const labelFontSize = ["md", "2xl"];

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" bg="gray.400" marginLeft={["0.1%", "1%"]} marginRight={["0.1%", "1%"]} marginBottom="1%" marginTop="1%" borderWidth='4px' borderColor={outlineColor} borderRadius='xl'>
      <Flex width="50%" flexDirection="column" p={{ base: "1%", md: "2%" }} paddingTop={{ base: "1%", md: "0.5%" }} paddingBottom={{ base: "2%", md: "1%" }}>
        <Box width="100%">
          <Box {...cimStyle}>Keresés:</Box>
          <InputGroup width="100%" alignContent='center'
            fontSize={{ base: "sm", md: "lg" }}
            size={{ base: "sm", md: "lg" }} >
            <InputLeftElement pointerEvents='none'>
              <Search2Icon color={textColor} w={{ base: "4", md: "8" }} h={{ base: "4", md: "8" }} />
            </InputLeftElement>
            <Input
              placeholder="Elhunyt neve"
              value={searchQuery}
              onChange={handleSearch}
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
          <Box {...cimStyle} paddingTop={secondTextsPaddingTop}>Sorrendezés:</Box>
          <Select
            placeholder="Sorrendezés"
            value={sortOption}
            onChange={handleSort}
            variant='outline'
            outlineColor='gray.800'
            focusBorderColor="#234150"
            background={bgcolor}
            color='gray.200'
            fontSize={rightInputGroupStyle.fontSize}
            size={{ base: "sm", md: "lg" }}
          >
            <option value="name">Név</option>
            <option value="date_of_decease">Elhalálozás dátuma</option>
            <option value="date_of_birth">Születés dátuma</option>
          </Select>
        </Box>
      </Flex>


      <Flex width="50%" p={{ base: "1%", md: "2%" }} paddingTop={{ base: "1%", md: "0.5%" }} paddingBottom={{ base: "2%", md: "1%" }} flexDirection="column">
        <Box {...cimStyle}>Szűrés:</Box>
        <Flex width="100%" flexDirection="row">
          <Box fontSize={labelFontSize}>Születés éve:</Box>
          <InputGroup {...rightInputGroupStyle}>
            <Input
              background={bgcolor}
              color={textColor}
              _placeholder={{ color: textColor }}
              variant='outline'
              focusBorderColor={focusColor}
              outlineColor={outlineColor}
              fontSize={rightInputGroupStyle.fontSize}
            />
            <InputRightAddon display={{ base: "none", md: "block" }}>
              <Box fontSize={rightInputGroupStyle.fontSize}>(után)</Box>
            </InputRightAddon>
          </InputGroup>
        </Flex>

        <Box {...cimStyle} paddingTop={secondTextsPaddingTop} />

        <Flex width="100%" flexDirection="row">
          <Box>
            <Box fontSize={labelFontSize}>Elhalálozás éve:</Box>
          </Box>
          <InputGroup {...rightInputGroupStyle}>
            <Input
              background={bgcolor}
              color={textColor}
              _placeholder={{ color: textColor }}
              variant='outline'
              focusBorderColor={focusColor}
              outlineColor={outlineColor}
              fontSize={rightInputGroupStyle.fontSize}
            />
            <InputRightAddon display={{ base: "none", md: "block" }}>
              <Box fontSize={rightInputGroupStyle.fontSize} >(előtt)</Box>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Flex>

    </Box>

  );
};

export default SearchBar;
