import React from 'react';
import ActionIcon from './action-icon';
import './confirm-cancel-icons.css';
export default ({ confirmAction, cancelAction }) =>
  <div className="d-flex ConfirmCancel">
    <div className="align-self-center confirm-icon">
      <ActionIcon
        dataId="i-confirm"
        tooltip="Confirm"
        icon={"fas fa-check"}
        onClick={confirmAction}
      />
    </div>
    <div className="align-self-center cancel-icon">
      <ActionIcon
        dataId="i-cancel"
        tooltip="Cancel"
        icon={"fas fa-times"}
        className={"icon-negative"}
        onClick={cancelAction}
      />
    </div>
  </div>;