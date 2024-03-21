import React, { useState } from 'react';
import { Box, Image, Modal, ModalContent, ModalOverlay, ModalCloseButton } from '@chakra-ui/react';
import sir1 from '../../Pictures/sir1.jpg';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Box p="4">
          <Image src={src} />
        </Box>
      </ModalContent>
    </Modal>
  );
};

const LargeImage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box borderWidth='4px' borderColor={"gray.800"} borderRadius="full" boxSize="100%" overflow="hidden" onClick={openModal} cursor="pointer">
        <Image src={sir1} />
      </Box>
      <ImageModal isOpen={isModalOpen} onClose={closeModal} src={sir1} />
    </>
  );
};

export default LargeImage;
