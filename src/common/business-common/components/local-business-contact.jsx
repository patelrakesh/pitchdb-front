import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';

const LocalBusinessContact = ({ business }) => (
  <>
    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Phone:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={business.phoneNumber ? business.phoneNumber : business.phone} />
    </div>

    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Website:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={business.webAddress ? business.webAddress : business.website} />
    </div>

    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Address:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={`${business.address ? business.address : business.companyAddress} ${business.zipcode ? '(ZIP ' + business.zipcode + ')' : ''}`} />
    </div>
  </>
);

export default LocalBusinessContact;