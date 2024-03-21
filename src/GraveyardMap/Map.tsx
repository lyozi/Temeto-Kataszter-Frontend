import React from 'react';
import LeafletMap from './LeafletMap';
import { Box } from '@chakra-ui/react';

const Map: React.FC = () => {
  return (
    <Box h="87.855vh" overflow="hidden" p="0px">
      <LeafletMap/> 
    </Box>
  );
};

export default Map;
