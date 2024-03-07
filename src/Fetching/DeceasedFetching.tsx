import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import DeceasedCard from '../DeceasedList/DeceasedCard';
import axios from 'axios';
import { DeceasedsMessagesDTO, Deceased } from './types';

interface FetchingProps {
  searchParams?: {
    name?: string;
    birthYearAfter?: number;
    deceaseYearBefore?: number;
    orderBy?: string;
  };
  handleDeceasedMessagesSelected: (deceased: Deceased) => void;
  isDeceasedMessagesSelected: boolean;
}

const retrieveDeceased = async (searchParams?: FetchingProps['searchParams']): Promise<Deceased[]> => {
  let url = 'https://localhost:7191/api/Deceased/Search';
  if (searchParams) {
    const { name, birthYearAfter, deceaseYearBefore, orderBy } = searchParams;
    url += `?name=${name}&birthYearAfter=${birthYearAfter}&deceaseYearBefore=${deceaseYearBefore}&orderBy=${orderBy}`;
  }

  const response = await axios.get<Deceased[]>(url);
  return response.data;
};

const DeceasedFetching: React.FC<FetchingProps> = ({ searchParams, handleDeceasedMessagesSelected, isDeceasedMessagesSelected }) => {
  const { data: deceaseds, error, isLoading } = useQuery<Deceased[], Error>(
    ['deceasedsData', searchParams],
    () => retrieveDeceased(searchParams),
  );

  if (isLoading) return <div>Keresés...</div>;
  if (error) return <div>Hiba történt: {error.message}</div>;

  return (
    <Flex flexDirection="row" flexWrap="wrap"
      overflowY={isDeceasedMessagesSelected ? "scroll" : "visible"}>
      {deceaseds &&
        deceaseds.map((deceased) => (
          <DeceasedCard
            deceased={deceased}
            handleDeceasedMessagesSelected={handleDeceasedMessagesSelected}
            isDeceasedMessagesSelected={isDeceasedMessagesSelected}
            key={deceased.id}
          />
        ))}
    </Flex>
  );
};

export default DeceasedFetching;
