import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { DeceasedsMessagesDTO, Deceased, Message } from './types';
import MessageComponent from '../DeceasedList/DeceasedMessages/MessageComponent';
import AddMessageForm from '../DeceasedList/DeceasedMessages/AddMessageForm';
import { ArrowDownIcon } from '@chakra-ui/icons';

interface DeceasedMessagesFetchingProps {
  selectedDeceased: Deceased;
  notifyLoadingComplete: (deceasedDto: DeceasedsMessagesDTO) => void;
}

export const DeceasedMessagesFetching: React.FC<DeceasedMessagesFetchingProps> = ({ selectedDeceased, notifyLoadingComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndComponent = useRef<HTMLDivElement>(null);

  const getDeceasedMessagesDTO = async (id: number): Promise<DeceasedsMessagesDTO> => {
    const response = await axios.get<DeceasedsMessagesDTO>(`https://localhost:7191/api/Deceased/DeceasedsMessages/${id}`);
    const data = response.data;
    return data;
  };

  const scrollToBottom = () => {
    if (messagesEndComponent.current) {
      messagesEndComponent.current.scrollIntoView({ behavior: "instant", block: "end" });
    }
  };

  const { data: deceasedMessages, isLoading, error } = useQuery<DeceasedsMessagesDTO, Error>(
    ['deceasedMessagesData', selectedDeceased.id],
    () => getDeceasedMessagesDTO(selectedDeceased.id),
    {
      onSuccess: scrollToBottom
    }
  );

  useEffect(() => {
    if (deceasedMessages) {
      setMessages(deceasedMessages.messageList);
      notifyLoadingComplete(deceasedMessages);
    }
  }, [deceasedMessages, notifyLoadingComplete]);

  const handleMessageAdded = (newMessage: Message) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) return <div>Keresés...</div>;
  if (error) return <div>Hiba történt: {error.message}</div>;

  return (
    <Flex flexDirection="column" height="100%" width="100%">
      <Box
        background='gray.700'
        borderWidth='3px'
        borderRadius='lg'
        borderColor='gray.800'
        padding="2%"
        paddingBottom="0"
        overflowY="auto"
        h="93.5%"
      >
        {messages.map((message) => (
          <MessageComponent message={message} key={message.id} />
        ))}
        <div ref={messagesEndComponent} /> {/* ide gorget le */}
      </Box>
      <Box h="6.5%">
        <AddMessageForm id={selectedDeceased.id} notifyMessageAdded={handleMessageAdded}></AddMessageForm>
      </Box>

      <Button
        onClick={scrollToBottom}
        position="absolute"
        bottom="7%"
        left="27.5%"
        bg="gray.800"
        borderRadius="full"
        _hover={{
          bg: "gray.600"
        }}
      >
        <ArrowDownIcon boxSize="30px" color="gray.200" />
      </Button>
    </Flex>
  );
};

export default DeceasedMessagesFetching;
