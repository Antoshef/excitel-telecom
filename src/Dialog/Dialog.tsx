import { FC, memo } from "react";
import { ICountry } from "../models";
import { DIALOG_HEADER } from "./constants";
import DialogBody from "./DialogBody";

type Props = {
  data: ICountry | boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = ({ data, onClose }) => {
  const clickHandler = (event: any) => {
    if (event.target.id === "dialog") onClose()
  }
  return (
    <>
      {typeof data === "object" && 
      <div 
        id="dialog" 
        className="dialog"
        onClick={clickHandler}
      >
        <div className="dialog-content">
          <div className="dialog-header">
            <button onClick={onClose} className="close">&times;</button>
            <h2>{DIALOG_HEADER}</h2>
          </div>
          <DialogBody data={data} />
        </div>
      </div>
      }
    </>
  )
}

export default memo(Dialog)