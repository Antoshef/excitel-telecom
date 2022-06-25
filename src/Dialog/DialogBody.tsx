import { FC } from "react";
import { ICountry } from "../models";
import { 
  DIALOG_CAPITAL, 
  DIALOG_CODE, 
  DIALOG_COUNTRY, 
  DIALOG_FLAG, 
  DIALOG_LATLNG, 
  DIALOG_POPULATION, 
  DIALOG_REGION, 
  DIALOG_SUBREGION 
} from "./constants";

type Props = {
  data: ICountry;
}

const DialogBody: FC<Props> = ({ data }) => {

  return (
    <div className="dialog-body">
      <p><span className="label">{DIALOG_COUNTRY}</span><b><span>{data.name}</span></b></p>
      <p><span className="label">{DIALOG_CAPITAL}</span><b><span>{data.capitalName}</span></b></p>
      <p><span className="label">{DIALOG_CODE}</span><b><span>{data.code}</span></b></p>
      <p><span className="label">{DIALOG_LATLNG}</span><b><span>{data.latLng}</span></b></p>
      <p><span className="label">{DIALOG_POPULATION}</span><b><span>{data.population}</span></b></p>
      <p><span className="label">{DIALOG_REGION}</span><b><span>{data.region}</span></b></p>
      <p><span className="label">{DIALOG_SUBREGION}</span><b><span>{data.subregion}</span></b></p>
      <p className="align-center"><span className="label">{DIALOG_FLAG}</span><img src={data.flag} /></p>
    </div>
  )
}

export default DialogBody