import React, { useState } from 'react';
import { Flex, Button} from '@chakra-ui/react';
import {Grave} from './GraveFetching';

interface Props {
  onSubmit: (newGrave: Partial<Grave>) => void;
}

const GraveAddForm: React.FC<Props> = ({ onSubmit }) => {
  const [newGrave, setNewGrave] = useState<Partial<Grave>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrave((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddGrave = () => {
    onSubmit(newGrave);
    setNewGrave({});
  };

  return (
    <Flex flexDirection="column">
      <input
        type="number"
        name="row"
        placeholder="Row"
        value={newGrave.row || ''}
        onChange={handleChange}
      />
      <input
        type="number"
        name="number"
        placeholder="Number"
        value={newGrave.number || ''}
        onChange={handleChange}
      />
      <input
        type="number"
        name="type"
        placeholder="Type"
        value={newGrave.type || ''}
        onChange={handleChange}
      />
      <Button onClick={handleAddGrave}>Save</Button>
    </Flex>
  );
};

export default GraveAddForm;
