import React, { useState } from 'react';
import { Input, Button, Flex, useToast, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Text, Divider } from '@chakra-ui/react';
import { Message } from '../../types';
import { useMutation } from 'react-query';
import axios from 'axios';

interface AddMessageFormProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  notifyMessageAdded: (message: Message) => void;
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({ id, isOpen, onClose, notifyMessageAdded }) => {
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [itemType, setItemType] = useState<number>(1); // Default value
  const toast = useToast();

  const postMessage = async (id: number, newMessage: Partial<Message>) => {
    const response = await axios.put(`https://localhost:7191/api/Deceased/AddMessage/${id}`, newMessage);
    return response.data;
  };

  const mutation = useMutation((newMessage: Partial<Message>) => postMessage(id, newMessage), {
    onSuccess: (data: Message) => {
      notifyMessageAdded(data);
      toast({
        title: 'Üzenet elküldve',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setAuthor('');
      setText('');
      setItemType(1);
      onClose();
    },
    onError: () => {
      toast({
        title: 'Hiba történt',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = () => {
    if (!author || !text) {
      toast({
        title: 'Adja meg a nevet és az üzenetet',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutation.mutate({ author: author, text: text, dateOfCreation: new Date(), itemType: itemType });
  };

  const inputStyle = {
    background: 'gray.600',
    color: 'gray.200',
    _placeholder: { color: 'gray.200' },
    variant: 'outline',
    focusBorderColor: '#234150',
    outlineColor: 'gray.800',
    fontSize: { base: "sm", md: "xl" }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="gray.200">
        <ModalHeader fontStyle="bold" fontSize="3xl" borderBottomWidth="1px" textAlign="center">Megemlékező üzenet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider my="5px" borderColor="gray.800"/>
          <Flex flexDirection="column">
            <Text mb={0.5} mt={4}  fontSize="2xl">Megemlékező neve:</Text>
            <Input
              placeholder="monogram, keresztnév, teljes név.."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              {...inputStyle}
            />
            <Text mb={0.5} mt={4} fontSize="2xl">Üzenet szövege:</Text>
            <Textarea
              placeholder="megemlékezés, idézet, üzenet.."
              value={text}
              onChange={(e) => setText(e.target.value)}
              {...inputStyle}
              rows={6}
            />
            <Text mb={0.5} mt={4} fontSize="2xl">Emléktárgy típusa:</Text>
            <Select
              value={itemType}
              onChange={(e) => setItemType(parseInt(e.target.value))}
              {...inputStyle}
            >
              <option value={1}>Koszoru1</option>
              <option value={2}>Koszoru2</option>
              <option value={3}>Koszoru3</option>
              <option value={4}>Koszoru4</option>
              <option value={5}>Koszoru5</option>
              <option value={6}>Koszoru6</option>
            </Select>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
            {...inputStyle}
            _hover={{ bg: 'gray.500' }}
            mr="5%"
          >
            Elküldés
          </Button>
          <Button
            onClick={onClose}
            isLoading={mutation.isLoading}
            {...inputStyle}
            _hover={{ bg: 'gray.500' }}>
            Mégse
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMessageForm;
