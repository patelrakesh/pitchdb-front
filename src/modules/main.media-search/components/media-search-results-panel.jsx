import React from 'react';
import MediaItem from '../../../common/media-common/components/media-item';
import SearchResults from '../../../common/search-common/containers/search-results';
import './media-search-results-panel.css';

const totalMedia = '38,690';

const MediaSearchResultsPanel = (props) => (
  <SearchResults {...props} totalResultsStr={`${totalMedia} media outlets`} titleId="event-list-modal">
    {props.resultsCurrent.map((media, index) =>
      <MediaItem media={media} key={index} index={index} {...props} handleSelected={props.handleSelected} />
    )}

  </SearchResults>
);

export default MediaSearchResultsPanel;