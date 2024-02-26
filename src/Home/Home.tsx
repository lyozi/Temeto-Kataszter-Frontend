import { Flex } from '@chakra-ui/react';
import GraveYardCard from './GraveYardCard';
import balyok from '../Pictures/balyok.png';



const Home = () => {
  return (
    <Flex>
      <GraveYardCard settlement="Bályok" graveyardName="" image={balyok} />
    </Flex>
  );
};

export default Home;
