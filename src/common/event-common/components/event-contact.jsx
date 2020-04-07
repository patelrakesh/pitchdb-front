import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import constants from '../constants';

const EventContact = ({ event }) => (
  <>
    <div className="col-12 result-label-value">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text="Name:" />

      <DisplayLabel
        textType={textTypes.DISPLAY_NORMAL}
        text={`${event.firstName} ${event.lastName}`} />
    </div>

    {event.dataFileType === constants.TYPE_PRINCIPAL ?
      <>
        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Phone:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={event.phone} />
        </div>
        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Address:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={`${event.address} ${event.zipCode ? '(ZIP ' + event.zipCode + ')' : ''}`} />
        </div>
      </>
      :
      <>
        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Phone:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={event.personPhone} />
        </div>

        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Org. Phone:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={event.organizationPhone} />
        </div>

        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Website:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={event.organizationWebsite} />
        </div>

        <div className="col-12 result-label-value">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Address:" />

          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={`${event.address1} ${event.zipCode ? '(ZIP ' + event.zipCode + ')' : ''}`} />
        </div>
      </>
    }
  </>
);

export default EventContact;