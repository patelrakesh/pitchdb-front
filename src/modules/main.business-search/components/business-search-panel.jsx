/* eslint-disable linebreak-style */
import React from 'react';
import BusinessSearchParameters from '../containers/business-search-parameters';
import BusinessSearchResults from '../containers/business-search-results';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './business-search-panel.css';
import Divider from '@material-ui/core/Divider';

export default props => (
  <div className="BusinessSearchPanel col-lg-12 content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Business Search"
      />
      <Divider />
      <br></br>
    </div>
    <BusinessSearchParameters {...props} />
    <BusinessSearchResults {...props} />
  </div>
);