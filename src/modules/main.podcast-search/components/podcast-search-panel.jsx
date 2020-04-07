/* eslint-disable linebreak-style */
import React from 'react';
import PodcastFinderParameters from '../containers/podcast-search-parameters';
import PodcastFinderResults from '../containers/podcast-search-results';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './podcast-search-panel.css';
import Divider from '@material-ui/core/Divider';

const PodcastFinderPanel = props => (
  <div className="PodcastFinderPanel col content-padding">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Podcast Search"
      />
      <Divider className="divider"/>
    </div>
    <PodcastFinderParameters {...props} />
    <PodcastFinderResults {...props} />
  </div>
);

export default PodcastFinderPanel;
