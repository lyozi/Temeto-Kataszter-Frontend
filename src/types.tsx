import {LatLngLiteral } from "leaflet";

export interface Grave {
  id: number;
  row: number;
  number: number;
  type: number;
}

export interface Deceased {
  id: number;
  name: string;
  dateOfDeath: Date;
  dateOfBirth: Date;
}

export interface DeceasedsMessagesDTO {
  deceased: Deceased;
  messageList: Message[];
  nrOfFlowers: number;
  nrOfWreaths: number;
  nrOfCandles: number;
}

export interface Message {
  id: number;
  itemType: number;
  author: string;
  text: string;
  dateOfCreation: Date;
}

export interface User {
  email: string;
  role: string;
}

export interface GraveUIPolygon {
  id: number;
  latLngs: LatLngLiteral[];
  graveId?: number;
}