import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Deceased, DeceasedsMessagesDTO, Message } from '../../Fetching/types';
import { DeceasedMessagesFetching } from '../../Fetching/DeceasedMessagesFetching';
import AddMessageForm from './AddMessageForm';
import sir1 from '../../Pictures/sir1.jpg'
import MessagesTopBar from './MessagesTopBar';

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

  const notifyLoadingComplete = (deceasedDto: DeceasedsMessagesDTO) => {
    deceasedDto.deceased = selectedDeceased;
    setDeceasedDto(deceasedDto);
  };

  return (
    <Flex direction="column" height="100%" width="100%">
      <Box h="10%">
        <MessagesTopBar deceasedDto={deceasedDto} notifyClosed={notifyClosed} />
      </Box>
      <Flex direction="row" height="90%">
        <Box
          width="70%"
        >
          <DeceasedMessagesFetching selectedDeceased={selectedDeceased} notifyLoadingComplete={notifyLoadingComplete}/>

        </Box>

        <Image src={sir1} w="30%" height="50%" />
      </Flex>
    </Flex>
  );
};

export default MessagesPanel;
