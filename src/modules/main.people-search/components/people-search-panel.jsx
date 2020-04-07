/* eslint-disable linebreak-style */
import React from 'react';
import GuestFinderParameters from '../containers/people-search-parameters';
import GuestFinderResults from '../containers/people-search-results';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './people-search-panel.css';
import Divider from '@material-ui/core/Divider';

const GuestFinderPanel = props => (
  <div className="GuestFinderPanel col-lg-12 content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="People Search"
      />
      <Divider className="divider"/>
    </div>
    <GuestFinderParameters {...props} />
    <GuestFinderResults {...props} />
  </div>
);

export default GuestFinderPanel;
