import React from 'react';
import InputBox from '../../../common/general/components/input-box';
import Select from 'react-select';
import AppForm from '../../../common/general/components/app-form';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import LocationParameters from '../../../common/search-common/containers/location-parameters';
import FilterParameterSearch from '../../../common/search-common/containers/filter-parameter-search';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import 'react-datepicker/dist/react-datepicker.css';
import './people-search-parameters-panel.css';
import '../../../common/general/styles/parameters.css';

const GuestFinderParametersPanel = props => (
  <div className="GuestFinderParametersPanel col-lg-11 col">
    <AppForm onSubmit={() => props.search(0)}>
      <ParamGroup>
        <div className="col-12 col-lg-7 InputBox keywords-input">
          <KeywordsParameter {...props} noMin={true} />
        </div>
      </ParamGroup>
      <LocationParameters {...props} />
      <ParamGroup
        icon="fas fa-key"
        title="Job Title">
        <div className="col-lg-4 col-12">
          <FilterParameterSearch
            value={props.jobTitle}
            searchParameters={props.searchJobTitles}
            name="job title"
            labelKey="title"
            property="jobTitle"
            {...props} />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-key"
        title="Industry">
        <div className="col-lg-4 col-12">
          <Select
            name="industry"
            value={props.industry}
            onChange={props.handleIndustry}
            options={props.industriesList}
            placeholder="Select industry"
            styles={selectStyles}
            isClearable={true}
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-key"
        title="Exclude keywords">
        <div className="col-lg-4 col-12">
          <InputBox
            box={true}
            type="text"
            name="exclude"
            onChange={props.handleInputChange}
            value={props.exclude}
            inputType="podcast-search-field"
            placeholder="Exclude words (HR, support, etc.)"
            min={2}
          />
        </div>
      </ParamGroup>
    </AppForm>
  </div>
);

export default GuestFinderParametersPanel;
