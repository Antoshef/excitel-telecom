import React, { FC, MouseEvent, useCallback, useEffect, useState } from "react"
import Dialog from "./Dialog"
import LineItem from "./LineItem"
import { TableProps } from "./models"
import TableHeader from "./TableHeader"

const Table: FC<TableProps> = ({ data }) => {
  const [startTimer, setStartTimer] = useState(0)
  const [endTimer, setEndTimer] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    endTimer - startTimer >= 1000
      ? setOpen(true)
      : setOpen(false)
  }, [endTimer])

  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    setStartTimer(Math.ceil(performance.now()))
  }
  const onMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    setEndTimer(Math.ceil(performance.now()))
  }

  const closeHandler = useCallback(() => setOpen(false), [])

  return (
    <>
      <table>
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
        open={open} 
        onClose={closeHandler}
      />
    </>
  )
}

export default Table