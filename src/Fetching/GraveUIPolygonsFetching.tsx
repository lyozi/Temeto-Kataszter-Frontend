import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { GraveUIPolygon } from '../types';

export const retrievePolygons = async (): Promise<GraveUIPolygon[]> => {
  const response = await axios.get<GraveUIPolygon[]>('https://localhost:7191/api/GraveUIPolygons');
  return response.data;
};