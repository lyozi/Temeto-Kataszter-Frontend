import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Deceased, DeceasedsMessagesDTO } from '../../Fetching/types';
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

  const messagesEndComponent = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndComponent.current) {
      messagesEndComponent.current.scrollIntoView({ behavior: "instant", block: "end" });
    }
  };

  const notifyLoadingComplete = (deceasedDto: DeceasedsMessagesDTO) => {
    deceasedDto.deceased = selectedDeceased;
    setDeceasedDto(deceasedDto);
    scrollToBottom();
  };

  return (
    <Flex direction="column" height="100%" width="100%">
      <Box h="10%">
        <MessagesTopBar deceasedDto={deceasedDto} notifyClosed={notifyClosed} />
      </Box>
      <Flex direction="row" height="83.5%">
        <Box
          background='gray.700'
          borderWidth='3px'
          borderRadius='lg'
          borderColor='gray.800'
          width="70%"
          padding="2%"
          paddingBottom="0"
          overflowY="auto"
        >
          <DeceasedMessagesFetching id={selectedDeceased.id} notifyLoadingComplete={notifyLoadingComplete} />

          <Box height="0px" ref={messagesEndComponent} /> {/* ide gorget le */}

        </Box>

        <Image src={sir1} w="30%" height="50%" />
      </Flex>

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

      <Box h="6.5%">
        <AddMessageForm id={selectedDeceased.id}></AddMessageForm>
      </Box>
    </Flex>
  );
};

export default MessagesPanel;
