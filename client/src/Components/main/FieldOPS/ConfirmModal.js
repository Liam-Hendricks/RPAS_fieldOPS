import React from "react";
import { Button } from "react-bootstrap";
//Component for confirming a major action by user
const ConfirmModal=(props)=> {
  const {confirm,message,closeDelete}=props
  return (
    <div className="my-modal-deleteOPS-bg">
      <div className="my-modal-deleteOPS">
        <h3 className="confirm_message">
        {message}
         
        </h3>

        <div className="confirmButtons">
          <Button
            variant="primary"
            className="confirm_delete_button"
            style={{ bottom: "10px", left: "10px",marginLeft: "5px" }}
            onClick={confirm}
            
          >
            Confirm
          </Button>

          <Button
            variant="danger"
            className="cancel_delete_button"
            onClick={closeDelete}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
