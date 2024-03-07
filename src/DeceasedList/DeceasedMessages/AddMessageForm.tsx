import React, { useState } from 'react';
import { Input, Button, Flex, useToast } from '@chakra-ui/react';
import { Message } from '../../Fetching/types';
import { useMutation } from 'react-query';
import axios from 'axios';

interface AddMessageFormProps {
  id: number;
  notifyMessageAdded: (message: Message) => void;
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({ id, notifyMessageAdded }) => {
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
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

    mutation.mutate({ author: author, text: text, dateOfCreation: new Date() });
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
    <Flex flexDirection="row" bg="gray.400" padding="0.5%" h="100%" w="100%">
      <Input
        placeholder="A gyertát gyújtotta"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        width="20%"
        {...inputStyle}
      />
      <Input
        placeholder="Üzenet"
        value={text}
        onChange={(e) => setText(e.target.value)}
        width="50%"
        {...inputStyle}
      />
      <Button onClick={handleSubmit} width="30%" colorScheme='grey' isLoading={mutation.isLoading}>Add Message</Button>
    </Flex>
  );
};

export default AddMessageForm;
