import { FC, useCallback, useEffect, useState } from "react"
import Dialog from "../Dialog/Dialog"
import LineItem from "./LineItem"
import { ICountry, TableProps } from "../models"
import TableHeader from "./TableHeader"
import useLoader from "../Hooks/useLoader.hook"

const DURATION = 1500;

const Table: FC<TableProps> = ({ data }) => {
  const [open, setOpen] = useState<ICountry | boolean>(false)
  const [startTimer, setStartTimer] = useState(false)
  const [endTimer, setEndTimer] = useState(false)
  const { LoaderComponent, success } = useLoader({ 
    startTimer, 
    endTimer, 
    duration: DURATION 
  })

  useEffect(() => {
    if (endTimer) {
      setEndTimer(false)
    }
  }, [endTimer])

  const onMouseDown = useCallback(() => setStartTimer(true), [])

  const onMouseUp = (country: ICountry) => {
    setEndTimer(true)
    setStartTimer(false)
    success && setOpen(country)
  }

  const closeHandler = useCallback(() => setOpen(false), [])

  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader />
        <tbody>
          {data.map((item, index) => (
            <LineItem 
              key={index} 
              country={item} 
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
          ))}
        </tbody>
      </table>
      <Dialog 
        data={open} 
        onClose={closeHandler}
      />
      {LoaderComponent}
    </div>
  )
}

export default Table