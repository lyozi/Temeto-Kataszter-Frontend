import React, { useState } from 'react';
import { Flex, Text, Button, Image, VStack, Box, Divider, Modal, ModalContent } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import sir1 from '../../Pictures/sir1.jpg';
import AddMessageForm from './AddMessageForm';
import { DeceasedsMessagesDTO, Message } from '../../types';

interface MessagesSideBarProps {
  deceasedDto: DeceasedsMessagesDTO;
  notifyClosed: () => void;
  notifyMessageAdded: (newMessage: Message) => void;
}

const MessagesSideBar: React.FC<MessagesSideBarProps> = ({ deceasedDto, notifyClosed, notifyMessageAdded }) => {
  const { deceased, nrOfFlowers, nrOfWreaths, nrOfCandles } = deceasedDto;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseClick = () => {
    notifyClosed();
  };

  const handleAddMessageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex justify="space-between" bg="gray.400" width="100%" height="100%" borderRadius='xl'>
      <Flex align="center" direction="column" width="100%" padding="1.5%">
        <Button onClick={handleCloseClick} alignSelf="flex-end" borderWidth='2px' borderColor={"gray.800"} p={0}>
          <CloseIcon />
        </Button>
        <VStack spacing={4} align="center">
          <Box borderWidth='4px' borderColor={"gray.800"} borderRadius="full" boxSize="100%" overflow="hidden">
            <Image src={sir1} />
          </Box>

          <Text fontWeight="bold" fontSize="2xl">{deceased.name}</Text>
          <Divider my="5px" borderColor="gray.800" />
          <Text fontSize="lg">Született: {new Date(deceased.dateOfBirth).toLocaleDateString()}</Text>
          <Text fontSize="lg">Elhunyt: {new Date(deceased.dateOfDeath).toLocaleDateString()}</Text>
          <Divider my="5px" borderColor="gray.800" />
          <Text>Virágok: {nrOfFlowers}</Text>
          <Text>Koszorúk: {nrOfWreaths}</Text>
          <Text>Gyertyák: {nrOfCandles}</Text>

          <Button
            borderWidth='2px'
            borderColor={"gray.800"}
            bg="gray.700"
            color="white"
            fontWeight="bold"
            borderRadius="full"
            py="5%"
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.800' }}
            rightIcon={<EditIcon />}
            width="100%"
            height="20%"
            onClick={handleAddMessageClick}
          >
            Megemlékező üzenet írása
          </Button>

          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <ModalContent>
              <AddMessageForm id={deceased.id} notifyMessageAdded={notifyMessageAdded} isOpen={isModalOpen} onClose={ handleModalClose } />
            </ModalContent>
          </Modal>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default MessagesSideBar;
