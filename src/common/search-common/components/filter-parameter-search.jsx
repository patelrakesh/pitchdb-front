import React from 'react';
import Select from 'react-select';
import selectStyles from '../../search-common/util/select-styles';

export default (
  { value, name, labelKey, onChange, options, onInputChange, isLoading }) => (
    <Select
      name={name}
      getOptionValue={(option) => option._id}
      getOptionLabel={(option) => option[labelKey]}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={"Select " + name}
      onInputChange={onInputChange}
      noOptionsMessage={() => "Start typing a " + name + " to search"}
      isLoading={isLoading}
      styles={selectStyles}
      isClearable={true}
    />
  );