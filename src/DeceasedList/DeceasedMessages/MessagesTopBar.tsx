import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { DeceasedsMessagesDTO } from '../../Fetching/types'

interface MessagesTopBarProps {
  deceasedDto: DeceasedsMessagesDTO;
  notifyClosed: () => void;
}

const MessagesTopBar: React.FC<MessagesTopBarProps> = ({ deceasedDto, notifyClosed }) => {
  const { deceased, nrOfFlowers, nrOfWreaths, nrOfCandles } = deceasedDto;

  const handleCloseClick = () => {
    notifyClosed();
  };

  return (
    <Flex justify="space-between" align="center" bg="gray.400" p={4}>
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg">{deceased.name} </Text>
        <Text ml={4}>Virágok: {nrOfFlowers}</Text>
        <Text ml={4}>Koszorúk: {nrOfWreaths}</Text>
        <Text ml={4}>Gyerták: {nrOfCandles}</Text>
      </Flex>
      <Button onClick={handleCloseClick}>X</Button>
    </Flex>
  );
};

export default MessagesTopBar;