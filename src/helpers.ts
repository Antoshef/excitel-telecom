import { SortByEnum } from "./constants";
import { ICountry } from "./models";

export const sortHandler = (value: SortByEnum, countries: ICountry[]) => {
  switch (value) {
    case SortByEnum.CITY:
      const sortedByCity = [...countries.sort((a, b) => a.capitalName.localeCompare(b.capitalName))]
      return sortedByCity
    case SortByEnum.POPULATION:
      const sortedByPopulation = [...countries.sort((a, b) => b.population - a.population)]
      return sortedByPopulation
    default:
      const sortedByName = [...countries.sort((a, b) => a.name.localeCompare(b.name))]
      return sortedByName
  }
}