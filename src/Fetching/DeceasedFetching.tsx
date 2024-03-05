import React from 'react';
import { Flex, Wrap } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import DeceasedCard from '../DeceasedList/DeceasedCard';
import axios from 'axios';

export interface Deceased {
  id: number;
  name: string;
  dateOfDeath: Date;
  dateOfBirth: Date;
}

interface FetchingProps {
  searchParams?: {
    name?: string;
    birthYearAfter?: number;
    deceaseYearBefore?: number;
    orderBy?: string;
  };
  handleDeceasedMessagesSelected: (id: number) => void;
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

  if (isLoading) return <div>Fetching deceaseds...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Flex flexDirection="row" flexWrap="wrap">
        {deceaseds &&
          deceaseds.map((deceased) => (
            <DeceasedCard
              key={deceased.id}
              id={deceased.id}
              name={deceased.name}
              dateOfDeath={new Date(deceased.dateOfDeath)}
              dateOfBirth={new Date(deceased.dateOfBirth)}
              handleDeceasedMessagesSelected={handleDeceasedMessagesSelected}
              isDeceasedMessagesSelected={isDeceasedMessagesSelected}
            />
          ))}
    </Flex>
  );
};

export default DeceasedFetching;
