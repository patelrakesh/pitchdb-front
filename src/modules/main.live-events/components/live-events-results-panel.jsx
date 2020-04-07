import React from 'react';
import EventItem from '../../../common/event-common/components/event-item';
import SearchResults from '../../../common/search-common/containers/search-results';
import EventDetail from '../../../common/event-common/components/event-detail';
import './live-events-results-panel.css';

const totalAssocitations = '148,650';

const LiveEventsResultsPanel = props => (
  <SearchResults totalResultsStr={`${totalAssocitations} associations`} {...props} titleId="event-list-modal">
    {!props.itemDetail && props.resultsCurrent.map((event, index) =>
      <EventItem event={event} key={index} index={index} {...props} handleSelected={props.handleSelected} />
    )}
    {props.itemDetail &&
      <EventDetail
        eventDetail={props.itemDetail}
      />
    }

  </SearchResults>
);

export default LiveEventsResultsPanel;
