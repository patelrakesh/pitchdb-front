import React from 'react';
import BusinessItem from '../../../common/business-common/components/business-item';
import SearchResults from '../../../common/search-common/containers/search-results';
import LocalBusinessPeople from '../../../common/business-common/containers/local-business-people';
import './business-search-results-panel.css';

const totalBusinesses = '6,390,000';

const BusinessSearchResultsPanel = props => (
  <SearchResults {...props} totalResultsStr={`${totalBusinesses} businesses`} titleId="business-list-modal">
    {!props.itemDetail && props.resultsCurrent.map((business, index) => (
      <BusinessItem key={index} business={business} index={index} {...props} handleSelected={props.handleSelected} peopleSearch={true} />
    ))}
    {props.itemDetail &&
      <LocalBusinessPeople
        {...props}
        business={props.itemDetail}
        country={props.country}
      />
    }
  </SearchResults>
);

export default BusinessSearchResultsPanel;
