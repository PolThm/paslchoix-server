export interface Volunteer {
  id: number;
  name: string;
  target?: string;
}

export interface List {
  id: number;
  name: string;
  volunteers: Volunteer[];
}