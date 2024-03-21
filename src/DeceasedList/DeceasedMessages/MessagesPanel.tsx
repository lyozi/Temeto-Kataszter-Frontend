import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Deceased, DeceasedsMessagesDTO, Message } from '../../types';
import { DeceasedMessagesFetching } from '../../Fetching/DeceasedMessagesFetching';
import AddMessageForm from './AddMessageForm';
import MessagesSideBar from './MessagesSideBar';

interface Props {
  selectedDeceased: Deceased;
  notifyClosed: () => void;
}

const MessagesPanel: React.FC<Props> = ({ selectedDeceased, notifyClosed }) => {
  const [deceasedDto, setDeceasedDto] = useState<DeceasedsMessagesDTO>({
    deceased: selectedDeceased,
    messageList: [],
    nrOfFlowers: 0,
    nrOfWreaths: 0,
    nrOfCandles: 0,
  })

  const [newMessage, setNewMessage] = useState<Message>();

  const notifyLoadingComplete = (deceasedDto: DeceasedsMessagesDTO) => {
    deceasedDto.deceased = selectedDeceased;
    setDeceasedDto(deceasedDto);
  };

  const handleMessageAdded = (message: Message) => {
    setNewMessage(message);
  };

  return (
    <Flex direction="column" height="100%" width="100%" bg="gray.600" borderWidth='4px' borderColor={"gray.800"} borderRadius='xl'>
      <Flex direction="row" height="100%">
        <Box
          width="70%" p="1%" pr="0" py="1%"
        >
          <DeceasedMessagesFetching selectedDeceased={selectedDeceased} notifyLoadingComplete={notifyLoadingComplete} newMessage={newMessage} />

        </Box>

        <Box width="30%">
          <MessagesSideBar deceasedDto={deceasedDto} notifyClosed={notifyClosed} notifyMessageAdded={handleMessageAdded} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MessagesPanel;
