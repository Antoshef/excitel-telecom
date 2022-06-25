import { FC, memo } from "react";
import { ICountry } from "../models";
import { DIALOG_FOOTER, DIALOG_HEADER } from "./constants";
import DialogBody from "./DialogBody";

type Props = {
  data: ICountry | boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = ({ data, onClose }) => {
  
  return (
    <>
      {typeof data === "object" && <div id="dialog" className="dialog">
        <div className="dialog-content">
          <div className="dialog-header">
            <button onClick={onClose} className="close">&times;</button>
            <h2>{DIALOG_HEADER}</h2>
          </div>
          <DialogBody data={data} />
          <div className="dialog-footer">
            <h3>{DIALOG_FOOTER}</h3>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default memo(Dialog)