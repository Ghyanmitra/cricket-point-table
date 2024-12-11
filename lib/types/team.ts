export interface Team {
  _id: string;
  name: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  nrr: number;
}

export interface TeamFormData {
  name: string;
  matches?: number;
  won?: number;
  lost?: number;
  tied?: number;
  nrr?: number;
}