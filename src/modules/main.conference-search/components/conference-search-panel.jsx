/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ConferenceSearchParameters from '../containers/conference-search-parameters';
import ConferenceSearchResults from '../containers/conference-search-results';
import './conference-search-panel.css';
import Divider from '@material-ui/core/Divider';

const ConferenceSearchPanel = (props) =>
  <div className="ConferenceSearchPanel col-lg-12 content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Conferences Search"
      />
      <Divider className="divider"/>
    </div>
    <ConferenceSearchParameters {...props} />
    <ConferenceSearchResults {...props} />
  </div>;

export default ConferenceSearchPanel;