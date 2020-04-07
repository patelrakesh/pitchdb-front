import React from 'react';
import SearchResultSelected from '../../search-common/components/search-results-selected';
import NationalBusinessItem from './national-business-item';
import LocalBusinessItem from './local-business-item';
import './business-item.css';
import '../../general/styles/search-results.css';

const BusinessItem = props => (
  <div className={"BusinessItem row search-item" + (props.business.selected ? " result-selected" : "") + (props.staticItem ? " static-item" : "")
    + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={(!props.connected ? () => props.handleSelected(props.index, 'business') : () => { })}>
    {!props.staticItem &&
      <SearchResultSelected item={props.business} connected={props.connected} />
    }
    <div className="col-11">

      {props.business.organization ?
        <NationalBusinessItem {...props} />
        :
        <LocalBusinessItem {...props} />
      }
    </div>
  </div>
);

export default BusinessItem;
