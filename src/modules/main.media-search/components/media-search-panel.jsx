/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import MediaSearchParameters from '../containers/media-search-parameters';
import MediaSearchResults from '../containers/media-search-results';
import './media-search-panel.css';
import Divider from '@material-ui/core/Divider';

const MediaSearchPanel = (props) =>
  <div className="MediaSearchPanel col-lg-12 content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Media Outlets Search"
      />
      <Divider className="divider"/>
    </div>
    <MediaSearchParameters {...props} />
    <MediaSearchResults {...props} />
  </div>;

export default MediaSearchPanel;