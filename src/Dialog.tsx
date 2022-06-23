import { FC, memo } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = ({ open, onClose }) => {

  return (
    <>
      {open && <div id="dialog" className="Dialog">
        <div className="Dialog-content">
          <div className="Dialog-header">
            <button onClick={onClose} className="close">&times;</button>
            <h2>Modal Header</h2>
          </div>
          <div className="Dialog-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="Dialog-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default memo(Dialog)