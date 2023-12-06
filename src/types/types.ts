export interface Volunteer {
  id: string;
  name: string;
  target?: string;
}

export interface List {
  id: string;
  name: string;
  volunteers: Volunteer[];
}