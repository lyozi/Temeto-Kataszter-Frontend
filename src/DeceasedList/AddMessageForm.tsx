import React, { useState } from 'react';
import { Input, Button, Flex, useToast } from '@chakra-ui/react';
import { Message } from '../Fetching/DeceasedFetching';
import axios from 'axios';

interface AddMessageFormProps {
  id: number;
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({ id }) => {
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const toast = useToast();

  const handleSubmit = async () => {
    if (!author || !text) {
      toast({
        title: 'Missing Author or Message Text',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMessage: Partial<Message> = {
      author: author,
      text: text,
      dateOfCreation: new Date(),
    };

    const postMessage = async (id: number, newMessage: Partial<Message>) => {
      const response = await axios.put(`https://localhost:7191/api/Deceased/AddMessage/${id}`, newMessage);
      return response.data;
    };

    try {
      await postMessage(id, newMessage);
      toast({
        title: 'Message Added Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setAuthor('');
      setText('');
    } catch (error) {
      toast({
        title: 'Error Adding Message',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
    <Flex flexDirection="row" bg="gray.400" padding="0.5%">
      <Input
        placeholder="A gyertát gyújtotta:"
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
      <Button onClick={handleSubmit} width="30%" colorScheme='grey'>Add Message</Button>
    </Flex>
  );
};

export default AddMessageForm;