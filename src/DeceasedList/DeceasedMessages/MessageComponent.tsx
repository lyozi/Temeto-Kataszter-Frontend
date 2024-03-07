import React from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { Message } from '../../Fetching/types';

interface MessageComponentProps {
  message: Message;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const { itemType, author, text, dateOfCreation } = message;

  return (
    <Box
      background='gray.300'
      borderWidth='3px'
      borderRadius='lg'
      borderColor='gray.800'
      height="100%"
      marginTop="5%"
    >
      <Text fontWeight="bold">{author}</Text>
      <Divider my="5px" />
      <Text fontStyle="italic" fontSize="sm">{text}</Text>
      <Divider my="5px" />
      <Text>Dátum: {new Date(dateOfCreation).toLocaleDateString()}</Text>
      <Text>Tipus: {itemType}</Text>
    </Box>
  );
};

export default MessageComponent;
