import { FC, MouseEvent, memo, useState, useEffect } from "react"
import { ICountry } from "../models"

type Props = {
  country: ICountry;
  onSuccess: (data: ICountry) => void
}

const LineItem: FC<Props> = ({ country, onSuccess }) => {
  const [startTimer, setStartTimer] = useState(0)
  const [endTimer, setEndTimer] = useState(0)
  const { name, capitalName, population, flag } = country

  useEffect(() => {
    if (endTimer - startTimer >= 1000) {
      onSuccess(country)
    }
  }, [endTimer])
  
  const onMouseDown = (e: MouseEvent<HTMLTableRowElement>) => {
    setStartTimer(Math.ceil(performance.now()))
  }
  const onMouseUp = (e: MouseEvent<HTMLTableRowElement>) => {
    setEndTimer(Math.ceil(performance.now()))
  }

  return (
    <tr
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={(e) => onMouseUp(e)}
      className="country-btn"
    >
      <td className="table-data">{name}</td>
      <td className="table-data">{capitalName}</td>
      <td className="table-data">{population}</td>
      <td><img src={flag} /></td>
    </tr>
  )
}

export default memo(LineItem)