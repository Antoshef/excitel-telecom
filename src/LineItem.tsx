import React, { FC, MouseEvent, memo } from "react"
import { ICountry } from "./models"

type Props = {
  country: ICountry;
  onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LineItem: FC<Props> = ({ country, onMouseDown, onMouseUp }) => {
  const { name, capitalName, population, flag } = country

  return (
    <tr>
      <td>
        <button 
          onMouseDown={(e) => onMouseDown(e)}
          onMouseUp={(e) => onMouseUp(e)}
        >
          {name}
        </button>
      </td>
      <td>{capitalName}</td>
      <td>{population}</td>
      <td><img style={{ width: 22, height: 22 }} src={flag} /></td>
    </tr>
  )
}

export default memo(LineItem)