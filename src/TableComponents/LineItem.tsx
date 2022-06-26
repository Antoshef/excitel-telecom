import { FC, memo } from "react"
import { ICountry } from "../models"

type Props = {
  country: ICountry;
  onMouseDown: () => void;
  onMouseUp: (country: ICountry) => void;
}

const LineItem: FC<Props> = ({ country, onMouseDown, onMouseUp }) => {
  const { name, capitalName, population, flag } = country

  return (
    <tr
      onMouseDown={onMouseDown}
      onMouseUp={() => onMouseUp(country)}
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