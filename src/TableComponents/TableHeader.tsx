import { FC, memo } from "react";
import { CAPITAL, COUNTRY, FLAG, POPULATION } from "../constants";

const TableHeader: FC = () => (
  <thead>
    <tr>
      <th>{COUNTRY}</th>
      <th>{CAPITAL}</th>
      <th>{POPULATION}</th>
      <th>{FLAG}</th>
    </tr>
  </thead>
)

export default memo(TableHeader)