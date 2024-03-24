import React from 'react';
import LeafletMap from "./LeafletMap.js"
import { Box } from '@chakra-ui/react';
import { User } from '../types';

interface MapProps {
  user: User
}

const Map: React.FC<MapProps> = ({user}) => {
  return (
    <Box h="87.855vh" overflow="hidden" p="0px">
      <LeafletMap user={user}/> 
    </Box>
  );
};

export default Map;
