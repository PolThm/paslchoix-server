import { Request } from "express";

export interface Volunteer {
  _id?: string;
  id: string;
  name: string;
  target: string;
  hasDrawn: boolean;
}

export interface List {
  _id?: string;
  name: string;
  owner: string;
  volunteers: Volunteer[];
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

export interface DecodedUser {
  id: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user?: DecodedUser;
}