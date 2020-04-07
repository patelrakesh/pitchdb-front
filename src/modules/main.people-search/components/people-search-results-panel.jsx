import React from 'react';
import GuestItem from '../../../common/guest-common/components/guest-item';
import SearchResults from '../../../common/search-common/containers/search-results';
import './people-search-results-panel.css';

const GuestFinderResultsPanel = props => (
  <div>
    {props.searchResultsFile &&
      <iframe style={{ display: "none" }} className="search-frame"
        id="guestFinderFrame" srcDoc={props.searchResultsFile}></iframe>}
    <SearchResults {...props} loadOnly={true} titleId="guest-list-modal">
      {(props.searchType === 'guest' && !props.itemDetail) &&
        props.resultsCurrent.map((guest, index) =>
          <GuestItem guest={guest} key={index} index={index} {...props} handleSelected={props.handleSelected} />
        )}

      {props.itemDetail &&
        ""
      }
    </SearchResults>
  </div>
);

export default GuestFinderResultsPanel;
