/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';

const ConferenceContact = ({ conference }) => (
  <>
    {conference.contactName &&
      <div className="col-12 result-label-value">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text="Name:" />

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={`${conference.contactName}`} />
      </div>
    }

  </>
);

export default ConferenceContact;