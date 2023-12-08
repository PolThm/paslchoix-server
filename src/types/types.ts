export interface Volunteer {
  id: string;
  name: string;
  target?: string;
  isTargeted: boolean;
}

export interface List {
  id: string;
  name: string;
  volunteers: Volunteer[];
}