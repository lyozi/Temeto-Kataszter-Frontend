import React from "react";
import { Flex, Box } from "@chakra-ui/react";

interface DeceasedMessagesProps{
  id: number;
}

const DeceasedMessages: React.FC<DeceasedMessagesProps> = ({id}) => {
  return (
    <Box 
    background='gray.300' 
    borderWidth='3px'
    borderRadius='lg'
    borderColor='gray.800'
    height="100%">
      <Flex>
        <Box>
          id = {id}
        </Box>
      </Flex>
    </Box>
  );
};

export default DeceasedMessages;
