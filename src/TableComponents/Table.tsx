import React, { FC, useCallback, useState } from "react"
import Dialog from "../Dialog"
import LineItem from "./LineItem"
import { ICountry, TableProps } from "../models"
import TableHeader from "./TableHeader"

const Table: FC<TableProps> = ({ data }) => {
  const [open, setOpen] = useState<ICountry | boolean>(false)

  const openDialogHandler = useCallback((data: ICountry) => setOpen(data), [])

  const closeHandler = useCallback(() => setOpen(false), [])

  return (
    <>
      <table className="table">
        <TableHeader />
        <tbody>
          {data.map((item, index) => (
            <LineItem 
              key={index} 
              country={item} 
              onSuccess={openDialogHandler}
            />
          ))}
        </tbody>
      </table>
      <Dialog 
        open={typeof open !== "boolean"} 
        onClose={closeHandler}
      />
    </>
  )
}

export default Table