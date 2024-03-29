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

interface Props {
  loggedUserRole: string;
}

const Header: React.FC<Props> = ({loggedUserRole}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="row" align="center" justify={{ base: "space-between", md: "space-around" }} bg="gray.800" color="white" w="100%" p="1%" h={{ base: "6vh", md: "12.2vh" }}>
        <Box display="flex" alignItems="center" w="30%">
          <Image
            boxSize={{ base: "40%", md: '12%' }}
            src={logo2}
          />
          <Text style={{ fontFamily: 'Arial' }}
            fontSize={{ base: "140%", md: "150%", lg: "180%%", xl: "250%" }}>Temetőkataszter</Text>
        </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            aria-label="Toggle navigation"
          />
        </Box>

        <Box color="white" display={{ base: 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
          <NavButtons onClose={onClose} loggedUserRole={loggedUserRole} />
        </Box>
      </Flex>

      <HeaderDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
