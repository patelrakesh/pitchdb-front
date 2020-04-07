import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';

const MediaContact = ({ media }) => (
  <>
    {media.firstName &&
      <div className="col-12 result-label-value">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text="Name:" />

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={`${media.firstName} ${media.lastName}`} />
      </div>
    }

    {media.phone &&
      <div className="col-12 result-label-value">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text="Phone:" />

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={media.phone} />
      </div>
    }
  </>
);

export default MediaContact;