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
  volunteers: Volunteer[];
}