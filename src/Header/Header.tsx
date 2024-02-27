import { Box, Flex, Text, IconButton, useDisclosure, Image, Wrap } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import HeaderDrawer from './HeaderDrawer';
import NavButtons from './NavButtons';
import logo2 from '../Pictures/logo2.png';

export const buttonStyles = {
  color: "gray.200",
  variant: "ghost",
  _hover: { bg: 'gray.600', color: "white" }
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <>
        <Wrap align="center" justify="space-around"  bg="gray.800" color="white" w="100%">
          <Box display="flex" alignItems="center" w="30%">
            <Image 
            boxSize='12%'
            src={logo2}
            />
            <Text style={{ fontFamily: 'Arial', fontSize: '45px' }}>Temetőkataszter</Text>
          </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            aria-label="Toggle navigation"
          />
        </Box>

        <Box color="white" display={{ base: 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
          <NavButtons onClose={onClose}/>
        </Box>
      </Wrap>

      <HeaderDrawer isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default Header;
