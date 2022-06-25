import { FC, useCallback, useEffect, useState } from 'react';
import CustomTablePagination from './TableComponents/CustomTablePagination';
import "./App.css"
import { ICountry } from './models';
import Loader from './Loader';
import { countriesList, MAIN_HEADER, SEARCH, SortByEnum, SORT_BY } from './constants';
import * as _ from "lodash"
import { sortHandler } from './helpers';
import Dialog from './Dialog/Dialog';

const App: FC = () => {
  const [countries, setCounties] = useState<ICountry[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [componentIsLoaded, setComponentIsLoaded] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([])
  const [open, setOpen] = useState<ICountry | boolean>(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  
  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    search.length > 0 
      ? getCountries(search)
      : setOpenDropdown(false)
  }, [search])

  const getCountries = async (name?: string) => {
    try {
      setIsLoading(true)
      if (!componentIsLoaded) {
        const url = "https://cors-anywhere.herokuapp.com/https://excitel-countries.azurewebsites.net/countries"
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data: ICountry[] = await response.json()
        setCounties(data)
        setComponentIsLoaded(true)
      } else if (componentIsLoaded && name?.length) {
        const url = `https://cors-anywhere.herokuapp.com/https://excitel-countries.azurewebsites.net/countries/${name}`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data: ICountry[] = await response.json()
        setFilteredCountries(data)
        setOpenDropdown(true)
      } else if (componentIsLoaded && !name?.length) {
        setFilteredCountries([])
        setOpenDropdown(false)
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      throw err
    }
  }

  const changeHandler = (e: any) => setSearch(e.target.value)
  
  const debounceOnChange = _.debounce(changeHandler, 1500, {
    "leading": false,
    "trailing": true
  })

  const pickNameHandler = (name: string) => {
    const currentCountry = filteredCountries.find(item => item.name === name)
    currentCountry && setOpen(currentCountry)
  }

  const addSorting = (value: SortByEnum) => setCounties(sortHandler(value, countries))

  const closeHandler = useCallback(() => setOpen(false), [])

  const displayDropdown = () => {
    const filteredCountryNames = filteredCountries
      .filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()))
      .slice(0, 10)

    return (
      <div className="dropdown-menu">
        {filteredCountryNames && filteredCountryNames.map(item => (
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

  return (
    <div className="App">
      <Loader open={isLoading} />
      <h1>{MAIN_HEADER}</h1>
      <div className="main-header top-bottom-spacing">
        <div className="main-subeheader">
          <label className="label" htmlFor="search">{SEARCH}</label>
          <div className="search-bar">
            <input 
              type="text"
              id="search"
              onChange={debounceOnChange}
              autoComplete="off"
            />
            {openDropdown && displayDropdown()}
          </div>
        </div>
        <div className="main-subeheader">
          <label className="label" htmlFor="search">{SORT_BY}</label>
          <select
            onChange={(e) => addSorting(e.target.value as SortByEnum)}
          >
            <option value={SortByEnum.COUNTRY}>{SortByEnum.COUNTRY}</option>
            <option value={SortByEnum.CITY}>{SortByEnum.CITY}</option>
            <option value={SortByEnum.POPULATION}>{SortByEnum.POPULATION}</option>
          </select>
        </div>
      </div>
      <CustomTablePagination data={countries} />
      <Dialog
        data={open} 
        onClose={closeHandler}
      />
    </div>
  );
}

export default App;
