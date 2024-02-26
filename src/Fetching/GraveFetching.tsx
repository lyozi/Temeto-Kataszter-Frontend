import React, { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import GraveCard from "./GraveCard";
import axios from "axios";

export interface Grave {
  id: number;
  row: number;
  number: number;
  type: number;
  image?: string;
}

const retrieveGraves = async (): Promise<Grave[]> => {
  const response = await axios.get<Grave[]>("https://localhost:7191/api/Graves");
  return response.data;
};

const postGrave = async (newGrave: Partial<Grave>) => {
  const response = await axios.post<Grave>("https://localhost:7191/api/Graves", newGrave);
  return response.data;
};

const DisplayGraves: React.FC = () => {
  const { data: graves, error, isLoading } = useQuery<Grave[], Error>("gravesData", retrieveGraves);
  const [isAdding, setIsAdding] = useState(false);
  const [newGrave, setNewGrave] = useState<Partial<Grave>>({});
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation(postGrave, {
    onSuccess: () => {
      queryClient.invalidateQueries("gravesData");
      setIsAdding(false);
      setNewGrave({});
      toast({
        title: "Sírhely hozzáadva",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Hiba történt a sírhely hozzáadása során",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleAddGrave = () => {
    mutation.mutate(newGrave);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrave((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) return <div>Fetching graves...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Flex flexDirection="column">
      <Button onClick={() => setIsAdding(true)}>Add Grave</Button>
      {isAdding && (
        <Flex flexDirection="column">
          <input
            type="number"
            name="row"
            placeholder="Row"
            value={newGrave.row || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="number"
            placeholder="Number"
            value={newGrave.number || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="type"
            placeholder="Type"
            value={newGrave.type || ""}
            onChange={handleChange}
          />
          <Button onClick={handleAddGrave}>Save</Button>
        </Flex>
      )}

      <Flex>
        {graves &&
          graves.map((grave) => (
            <GraveCard
              key={grave.id}
              id={grave.id}
              row={grave.row}
              number={grave.number}
              type={grave.type}
              image={grave.image}
            />
          ))}
      </Flex>
    </Flex>
  );
};

export default DisplayGraves;
