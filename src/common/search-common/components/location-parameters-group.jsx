import React from 'react';
import Select from 'react-select';
import ParamGroup from '../../search-common/components/param-group';
import selectStyles from '../../search-common/util/select-styles';

export default props => (
  <ParamGroup
    title={props.paramLabel || "Location"}
    icon="fas fa-globe">
    <React.Fragment>
      <div className="col-lg-3 col-12">
        <Select
          name="country"
          clearValue={() => { return "Any"; }}
          value={props.country}
          onChange={props.handleCountry}
          options={props.countriesList}
          placeholder='Select country (leave blank for any)'
          styles={selectStyles}
        />
      </div>
      <div className="col-lg-3 col-12">
        <Select
          name="state"
          value={props.state}
          onChange={props.handleState}
          options={props.statesList}
          placeholder="Select state (leave blank for any)"
          styles={selectStyles}
          isClearable={true}
        />
      </div>
      <div className="col-lg-3 col-12">
        <Select
          name="city"
          value={props.city}
          onChange={props.handleCity}
          options={props.citiesList}
          placeholder="Select city (leave blank for any)"
          styles={selectStyles}
          isClearable={true}
        />
      </div>
    </React.Fragment>
  </ParamGroup>
);