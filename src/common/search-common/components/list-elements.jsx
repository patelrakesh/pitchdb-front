/* eslint-disable linebreak-style */
import React from 'react';
import Select from 'react-select';
import selectStyles from '../../../common/search-common/util/select-styles';
import './list-elements.css';

const ListElements = ({ lists, onListChange, isBusinessList }) =>
  <>
    <div className={(isBusinessList ? "col-8 col-lg-3 find-action" : "offset-lg-9 offset-2 col-8 col-lg-3") + " find-action"}>
      <Select
        name="contactLists"
        onChange={onListChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        options={lists}
        placeholder='Select contact list'
        styles={selectStyles}
      />
    </div>
  </>;

export default ListElements;
