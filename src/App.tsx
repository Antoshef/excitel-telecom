import { FC, useCallback, useEffect, useState } from 'react';
import CustomTablePagination from './TableComponents/CustomTablePagination';
import "./App.css"
import { ICountry } from './models';
import Loader from './Loader';
import { countriesList, SortByEnum } from './constants';
import * as _ from "lodash"

const App: FC = () => {
  const [countries, setCounties] = useState<ICountry[]>(countriesList)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState("")
  
  useEffect(() => {
    // getCountries()
  }, [])

  useEffect(() => {
    
  }, [search])

  const getCountries = (name?: string) => {
    name && console.log(name, "DONE")
    // try {
    //   setIsLoading(true)
    //   const url = "https://cors-anywhere.herokuapp.com/https://excitel-countries.azurewebsites.net/countries"
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   const data: ICountry[] = await response.json()
    //   setCounties(data)
    //   setIsLoading(false)
    // } catch (err) {
    //   setIsLoading(false)
    //   throw err
    // }
  }

  // const items = getCountries(search)

  useEffect(() => setFilter(search), [search])

  const changeHandler = (e: any) => setSearch(e.target.value)
  
  const debounceOnChange = _.debounce(changeHandler, 1000, {
    "leading": false,
    "trailing": true
  })

  const sortHandler = useCallback((value: SortByEnum) => {
    switch (value) {
      case SortByEnum.CITY:
        const sortedByCity = [...countries.sort((a, b) => a.capitalName.localeCompare(b.capitalName))]
        setCounties(sortedByCity)
        break;
      case SortByEnum.POPULATION:
        const sortedByPopulation = [...countries.sort((a, b) => b.population - a.population)]
        setCounties(sortedByPopulation)
        break;
      default:
        const sortedByName = [...countries.sort((a, b) => a.name.localeCompare(b.name))]
        setCounties(sortedByName)
        break;
    }
  }, [])

  const pickNameHandler = (name: string) => {
    setFilter("")
    getCountries(name)
  }

  const displayDropdown = () => {
    const filteredCountryNames = countries
      .filter(item => item.name.toLowerCase().includes(filter.toLocaleLowerCase()))
      .slice(0, 10)

    return (
      <div className="dropdown-menu">
        {filteredCountryNames.map(item => (
          <span 
            onClick={() => pickNameHandler(item.name)} 
            className="dropdown-item"
            key={item.code}
          >
            {item.name}
          </span>
        ))}
      </div>
    )
  }

  console.log(search, "FILTER")

  return (
    <div className="App">
      <Loader open={isLoading} />
      <div style={{ display: "flex", flexDirection: "row" }} className="top-bottom-spacing">
        <div style={{ position: "relative" }}>
          <label style={{ marginRight: 8 }} htmlFor="search">Search</label>
          <input 
            type="text"
            id="search"
            onChange={debounceOnChange}
            autoComplete="off"
          />
          {filter.length !== 0 && displayDropdown()}
        </div>
        <label style={{ marginRight: 8, marginLeft: 16 }} htmlFor="search">Sort by</label>
        <select
          onChange={(e) => sortHandler(e.target.value as SortByEnum)}
        >
          <option value={SortByEnum.COUNTRY}>{SortByEnum.COUNTRY}</option>
          <option value={SortByEnum.CITY}>{SortByEnum.CITY}</option>
          <option value={SortByEnum.POPULATION}>{SortByEnum.POPULATION}</option>
        </select>
      </div>
      <CustomTablePagination data={countries} />
    </div>
  );
}

export default App;
