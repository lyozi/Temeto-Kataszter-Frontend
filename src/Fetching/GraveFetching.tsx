import React from 'react';
import { Flex, Wrap, useToast } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import balyok from '../Pictures/balyok.png';
import GraveCard from '../DeceasedList/GraveCard';
import axios from 'axios';
import GraveAddForm from './GraveAddForm';
import {Grave} from '../types';

const retrieveGraves = async (): Promise<Grave[]> => {
  const response = await axios.get<Grave[]>('https://localhost:7191/api/Graves');
  return response.data;
};

const postGrave = async (newGrave: Partial<Grave>) => {
  const response = await axios.post<Grave>('https://localhost:7191/api/Graves', newGrave);
  return response.data;
};

const DisplayGraves: React.FC = () => {
  const { data: graves, error, isLoading } = useQuery<Grave[], Error>('gravesData', retrieveGraves);
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation(postGrave, {
    onSuccess: () => {
      queryClient.invalidateQueries('gravesData');
      toast({
        title: 'Sírhely hozzáadva',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Hiba történt a sírhely hozzáadása során',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (isLoading) return <div>Fetching graves...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Flex flexDirection="column">
      {/* <GraveAddForm onSubmit={handleAddGrave} />*/}
      <Wrap spacing="20px">
        {graves &&
          graves.map((grave) => (
            <GraveCard
              key={grave.id}
              id={grave.id}
              row={grave.row}
              number={grave.number}
              type={grave.type}
              image={balyok}
            />
          ))}
      </Wrap>
    </Flex>
  );
};

export default DisplayGraves;