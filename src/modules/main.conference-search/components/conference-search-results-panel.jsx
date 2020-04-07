import React from 'react';
import ConferenceItem from '../../../common/conference-common/components/conference-item';
import SearchResults from '../../../common/search-common/containers/search-results';
import './conference-search-results-panel.css';

const totalConferences = '3,300';

const ConferenceSearchResultsPanel = (props) => (
  <SearchResults {...props} totalResultsStr={`${totalConferences} conferences`} titleId="event-list-modal">
    {props.resultsCurrent.map((conference, index) =>
      <ConferenceItem conference={conference} key={index} index={index} {...props} handleSelected={props.handleSelected} />
    )}

  </SearchResults>
);

export default ConferenceSearchResultsPanel;