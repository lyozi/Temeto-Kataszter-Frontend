import React from 'react';
import { Box, Flex, Wrap } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import DeceasedCard from '../DeceasedList/DeceasedCard';
import axios from 'axios';

export interface Deceased {
  id: number;
  name: string;
  dateOfDeath: Date;
  dateOfBirth: Date;
}

export interface DeceasedsMessagesDTO {
  id: number;
  name: string;
  dateOfDeath: Date;
  dateOfBirth: Date;
  messageList: Message[];
  nrOfFlowers: number;
  nrOfWreaths: number;
  nrOfCandles: number;
}

export interface Message {
  id: number;
  itemType: number;
  author: string;
  text: string;
  dateOfCreation: Date;
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

const getDeceasedMessagesDTO = async (id: number): Promise<DeceasedsMessagesDTO> => {
  try {
    const response = await axios.get<DeceasedsMessagesDTO>(`https://localhost:7191/api/Deceased/DeceasedsMessages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deceased messages DTO:', error);
    return {
      id: 0,
      name: '',
      dateOfDeath: new Date(),
      dateOfBirth: new Date(),
      messageList: [],
      nrOfFlowers: 0,
      nrOfWreaths: 0,
      nrOfCandles: 0,
    };
  }
};

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
    <Flex flexDirection="row" flexWrap="wrap"
      overflowY={isDeceasedMessagesSelected ? "scroll" : "visible"}>
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

export const DeceasedMessagesFetching: React.FC<{ id: number }> = ({ id }) => {
  const { data: deceasedMessages, error, isLoading } = useQuery<DeceasedsMessagesDTO, Error>(
    ['deceasedMessagesData', id],
    () => getDeceasedMessagesDTO(id),
  );

  if (isLoading) return <div>Fetching deceased messages...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Flex flexDirection="column">
      <p>Name: {deceasedMessages?.name}</p>
      {deceasedMessages?.messageList.map((message) => (
        <Box
          background='gray.300'
          borderWidth='3px'
          borderRadius='lg'
          borderColor='gray.800'
          height="100%"
          key={message.id}
          marginTop="5%">
          Author: {message.author}
          Text: {message.text}
          Dátum: {new Date(message.dateOfCreation).toLocaleDateString()}
        </Box>
      ))
      }
    </Flex>
  );
};


export default DeceasedFetching;
