import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import InputBox from '../../../common/general/components/input-box';

import './email-report.css';

const EmailReport = (props) => (
  <div className="EmailReport container-fluid">
    <div className="row">
      <div className="col-12 title">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Report email"} />
      </div>
      <div className="col-12 report-explanation">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Having problems with this email? Submit a report to our support team."} />
      </div>
      <div className="col-12 edition-item">
        <InputBox
          box={false}
          type={"text"}
          name={"emailDescription"}
          onChange={props.handleInputChange}
          value={props.emailDescription}
          inputType={"podcast-search-field"}
          placeholder={"Description"}
        />
      </div>
      <div className="col-6 offset-lg-6 offset-0 col-lg-3 edition-item">
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={props.closeReportSequenceEmail}
          text={"Cancel"}
        />
      </div>
      <div className="col-6 col-lg-3 edition-item">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={props.reportSequenceEmail}
          text={"Send email"}
        />
      </div>
    </div>
  </div>
);

export default EmailReport;
