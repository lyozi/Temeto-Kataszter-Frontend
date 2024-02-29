import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Deceased } from '../Fetching/DeceasedFetching';
import sir1 from '../Pictures/sir1.jpg';
import sir2 from '../Pictures/sir2.jpg';
import sir3 from '../Pictures/sir3.jpg';
import sir4 from '../Pictures/sir4.jpg';
import sir5 from '../Pictures/sir5.jpg';
import sir6 from '../Pictures/sir6.jpg';


const getRandomImage = () => {
  const images = [sir1, sir2, sir3, sir4, sir5, sir6];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const DeceasedCard: React.FC<Deceased> = ({ name, dateOfDeath, dateOfBirth }) => {
  const randomImage = getRandomImage();

  return (
    <Box mt='1.5%' w={{ base: "47%", md: "19.1%" }} h="400px" borderWidth='3px' borderRadius='lg' overflow='hidden' borderColor='gray.800' _hover={{ cursor: 'pointer' }} bg='gray.300'>
      <Image src={randomImage} w="100%" />
      <Box p='4'>
        <Box fontWeight='semibold' as='h6' lineHeight='tight'>
          {name}
        </Box>

        <Box color='gray.500' fontWeight='semibold' fontSize='sm'>
          Született: {new Date(dateOfBirth).toLocaleDateString()}
        </Box>

        <Box color='gray.500' fontWeight='semibold' fontSize='sm'>
          Elhunyt: {new Date(dateOfDeath).toLocaleDateString()}
        </Box>
      </Box>
    </Box>
  );
};

export default DeceasedCard;
