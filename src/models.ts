import { PageSizeEnum } from "./constants";

export interface ICountry {
  capitalName: string;
  code: string;
  flag: string;
  latLng: number[];
  name: string;
  population: number;
  region: string;
  subregion: string;
}

export type TableProps = {
  data: ICountry[]
}

export interface IPagination {
  totalPages: number;
  total: number;
  from: number;
  to: PageSizeEnum;
}