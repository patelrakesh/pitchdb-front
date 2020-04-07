import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';

const NationalBusinessContact = ({ business }) => (
  <>
    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Phone:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={business.phone ? business.phone : business.phone1} />
    </div>

    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Website:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={business.website} />
    </div>

    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Address:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={`${business.address ? business.address : business.address1} ${business.zipCode ? '(ZIP ' + business.zipCode + ')' : ''}`} />
    </div>
  </>
);

export default NationalBusinessContact;