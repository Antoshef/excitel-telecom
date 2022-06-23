import React, { FC, useCallback, useEffect, useState } from 'react';
import { countriesList } from './constants';
import CustomTablePagination from './CustomTablePagination';
import "./App.css"

const App: FC = () => {
  const [countries, setCounties] = useState<Uint8Array | null>(null)
  const [search, setSearch] = useState("")

  const getCountries = async () => {
    try {
      const url = "https://excitel-countries.azurewebsites.net/countries"
      const response = await fetch(url, {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      const data = await response.json()
      console.log(data, "DATA");
    } catch (err) {
      // @ts-ignore
      console.error(err.message)
    }
  }

  useEffect(() => {
    // getCountries()
  }, [])

  const changeHandler = useCallback((value: string) => setSearch(value), [])

  return (
    <div className="App">
      <label htmlFor="search">Search</label>
      <input 
        type="text"
        id="search"
        value={search}
        onChange={(e) => changeHandler(e.target.value)}
      />
      <CustomTablePagination data={countriesList} />
    </div>
  );
}

export default App;
