import React from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { Message } from '../../types';
import koszoru1 from '../../Pictures/koszoru1.png';
import koszoru2 from '../../Pictures/koszoru2.png';
import koszoru3 from '../../Pictures/koszoru3.png';
import koszoru4 from '../../Pictures/koszoru4.png';
import koszoru5 from '../../Pictures/koszoru5.png';
import koszoru6 from '../../Pictures/koszoru6.png';

interface MessageComponentProps {
  message: Message;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const { itemType, author, text, dateOfCreation } = message;

  let koszoruImage;
  switch (itemType) {
    case 1:
      koszoruImage = koszoru1;
      break;
    case 2:
      koszoruImage = koszoru2;
      break;
    case 3:
      koszoruImage = koszoru3;
      break;
    case 4:
      koszoruImage = koszoru4;
      break;
    case 5:
      koszoruImage = koszoru5;
      break;
    case 6:
      koszoruImage = koszoru6;
      break;
    default:
      koszoruImage = null;
      break;
  }

  return (
    <Box
      background="gray.400"
      borderWidth='3px'
      borderRadius='lg'
      borderColor='gray.800'
      marginTop="5%"
      p="2%"
    >
      <Text fontWeight="bold" fontSize="xl">{author}</Text>
      <Divider my="5px" />
      <Text fontStyle="italic" fontSize="lg">{text}</Text>
      <Divider my="5px" />
      {koszoruImage && <Box pl="25%" pr="25%"><img src={koszoruImage} alt="koszoru" /></Box>}
      <Divider my="5px" />
      <Text fontSize="lg">Dátum: {new Date(dateOfCreation).toLocaleDateString()}</Text>
    </Box>
  );
};

export default MessageComponent;
