import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Grave } from './GraveFetching';

const GraveCard: React.FC<Grave> = ({ row, number, type, image }) => {
  const navigate = useNavigate();

  return (
    <Box mt='50px' ml='80px' w='200px' borderWidth='2px' borderRadius='lg' overflow='hidden' borderColor='gray.800' _hover={{ cursor: 'pointer' }} bg='gray.300'>
      {image && <Image src={`data:image/png;base64,${image}`} boxSize='200px' />}

      <Box p='4'>
        <Box fontWeight='semibold' as='h4' lineHeight='tight'>
          Sírhely: {number}
        </Box>

        <Box color='gray.500' fontWeight='semibold' fontSize='sm'>
          Sor: {row}, Típus: {type}
        </Box>
      </Box>
    </Box>
  );
};

export default GraveCard;
