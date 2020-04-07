import React from 'react';
import LocalBusinessItem from './local-business-item';
import GuestItem from '../../guest-common/components/guest-item';
import SearchResults from '../../search-common/containers/search-results';
import './local-business-people.css';

const LocalBusinessPeopleComponent = (props) => (
  <>
    {props.searchResultsFile &&
      <iframe style={{ display: "none" }} className="search-frame"
        id="businessPeopleFrame" srcDoc={props.searchResultsFile}></iframe>}
    <div id="business-people-detail" className={"LocalBusinessPeople col"}>
      <LocalBusinessItem {...props} boldTitle={true} />
      <div className="row">
        <div className="col-12">
          <SearchResults {...props} loadOnly={true}  titleId="business-list-modal" searchType="guest" headerTitle="People who work here" loadMoreDisabled={true}>
            {props.resultsCurrent.map((guest, index) =>
              <GuestItem guest={guest} key={index} index={index} {...props} handleSelected={props.handleSelected} />
            )}
          </SearchResults>
        </div>
      </div>
    </div>
  </>
);

export default LocalBusinessPeopleComponent;