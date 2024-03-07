import React from "react";
import { Flex, Box, Center } from "@chakra-ui/react";

interface DeceasedMessagesProps {
  id: number;
}

const outlineColor = 'gray.800';

const DeceasedMessages: React.FC<DeceasedMessagesProps> = ({ id }) => {
  return (
    <Box
      background='gray.300'
      borderWidth='3px'
      borderRadius='lg'
      borderColor='gray.800'
      height="100%">
    </Box>
  );
};

export default DeceasedMessages;
