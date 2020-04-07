/* eslint-disable linebreak-style */
import React from 'react';
import LiveEventsParameters from '../containers/live-events-parameters';
import LiveEventsResults from '../containers/live-events-results';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './live-events-panel.css';
import Divider from '@material-ui/core/Divider';

const LiveEventsPanel = props => (
  <div className="LiveEventsPanel col-lg-12 content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Event Planners Search"
      />
      <Divider className="divider"/>
    </div>
    <LiveEventsParameters {...props} />
    <LiveEventsResults {...props} />
  </div>
);

export default LiveEventsPanel;
