import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { PageSizeEnum } from "./constants"
import { ICountry, IPagination, TableProps } from "./models"
import Table from "./Table"

const CustomTablePagination: FC<TableProps> = ({ data }) => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(PageSizeEnum.MID)
  const [pagination, setPagination] = useState<IPagination>({
    totalPages: Math.ceil(data.length / rowsPerPage) ?? 1,
    total: data.length ?? 0,
    from: 1,
    to: rowsPerPage,
  })

  useEffect(() => {
    setPagination({
      totalPages: Math.ceil(data.length / rowsPerPage) ?? 1,
      total: data.length ?? 0,
      from: (rowsPerPage * (page - 1)) + 1,
      to: rowsPerPage * page,
    })
  }, [page])

  useEffect(() => {
    setPagination({
      totalPages: Math.ceil(data.length / rowsPerPage) ?? 1,
      total: data.length ?? 0,
      from: 1,
      to: rowsPerPage,
    })
    setPage(1)
  }, [rowsPerPage, data])

  const memoizedData = useMemo(() => {
    return data.slice(pagination.from - 1, pagination.to)
  }, [data, pagination])

  const pageSizeHandler = (value: number) => setRowsPerPage(value)

  return (
    <div>
      <Table data={memoizedData} />
      <div>
        <select 
          defaultValue={rowsPerPage} 
          onChange={(e) => pageSizeHandler(Number(e.target.value))}
        >
          <option value={PageSizeEnum.SM}>{PageSizeEnum.SM}</option>
          <option value={PageSizeEnum.MID}>{PageSizeEnum.MID}</option>
          <option value={PageSizeEnum.LARGE}>{PageSizeEnum.LARGE}</option>
          <option value={PageSizeEnum.XL}>{PageSizeEnum.XL}</option>
        </select>
        <span>From: {page}</span>{" / "}
        <span>{pagination.totalPages}</span>
        <button 
          disabled={page <= 1} 
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button 
          disabled={page >= pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CustomTablePagination