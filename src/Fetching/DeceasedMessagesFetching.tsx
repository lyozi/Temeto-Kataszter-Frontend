import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { DeceasedsMessagesDTO, Deceased } from './types';
import MessageComponent from '../DeceasedList/DeceasedMessages/MessageComponent';

interface DeceasedMessagesFetchingProps {
  id: number;
  notifyLoadingComplete: (deceasedDto: DeceasedsMessagesDTO) => void;
}

export const DeceasedMessagesFetching: React.FC<DeceasedMessagesFetchingProps> = ({ id, notifyLoadingComplete }) => {

  const getDeceasedMessagesDTO = async (id: number): Promise<DeceasedsMessagesDTO> => {
    const response = await axios.get<DeceasedsMessagesDTO>(`https://localhost:7191/api/Deceased/DeceasedsMessages/${id}`);
    const data = response.data;
    return data;
  };

  const { data: deceasedMessages, isLoading, error } = useQuery<DeceasedsMessagesDTO, Error>(
    ['deceasedMessagesData', id],
    () => getDeceasedMessagesDTO(id),
  );

  useEffect(() => {
    if (deceasedMessages) {
      notifyLoadingComplete(deceasedMessages);
    }
  }, [deceasedMessages, notifyLoadingComplete]);

  if (isLoading) return <div>Keresés...</div>;
  if (error) return <div>Hiba történt: {error.message}</div>;

  return (
    <Flex flexDirection="column">
      {deceasedMessages?.messageList.map((message) => (
        <MessageComponent message={message} key={message.id}/>
      ))}
    </Flex>
  );
};

export default DeceasedMessagesFetching;
