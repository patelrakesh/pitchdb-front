/* eslint-disable linebreak-style */
import React from 'react';
import Select from 'react-select';
import AppForm from '../../../common/general/components/app-form';
import LocationParameters from '../../../common/search-common/containers/location-parameters';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import FilterParameterSearch from '../../../common/search-common/containers/filter-parameter-search';
import RadioGroup from '../../../common/general/components/radio-group';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import 'react-datepicker/dist/react-datepicker.css';
import './business-search-parameters-panel.css';
import '../../../common/general/styles/parameters.css';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';

const BusinessSearchParametersPanel = props => (
  <div className="BusinessSearchParametersPanel col-lg-11 col">
    <AppForm onSubmit={() => props.search(0, true)}>
      <ParamGroup>
        <div className="col-lg-7 col-12 InputBox keywords-input">
          <KeywordsParameter {...props} noMin={true} />
        </div>
      </ParamGroup>
      <ParamGroup
        icon="fas fa-filter"
        title="Type">
        <div className="col type-filter">
          <RadioGroup
            handleOptionChange={props.handleInputChange}
            radioOptions={props.businessesType}
            selectedOption={props.type}
            inputName="type"
          />
        </div>
      </ParamGroup>

      <LocationParameters {...props} />

      {
        props.type === 'local' &&
        <React.Fragment>
          <ParamGroup
            icon="fas fa-filter"
            title="Business description">
            <div className="col-lg-4 col-12">
              <FilterParameterSearch
                value={props.description}
                searchParameters={props.searchDescriptions}
                name="description"
                labelKey="label"
                property="description"
                {...props} />
            </div>
          </ParamGroup>
          <ParamGroup></ParamGroup>
        </React.Fragment>
      }

      {
        props.type === 'national' &&
        <React.Fragment>
          <ParamGroup
            icon="fas fa-filter"
            title="Business industry">

            <div className="col-lg-4 col-12">
              <FilterParameterSearch
                value={props.industry}
                searchParameters={props.searchIndusties}
                name="industry"
                labelKey="industry"
                property="industry"
                loadOnMount={true}
                {...props} />
            </div>
          </ParamGroup>

          <ParamGroup
            icon="fas fa-filter"
            title="Business contact position">
            <div className="col-lg-4 col-12">
              <FilterParameterSearch
                value={props.position}
                searchParameters={props.searchPositions}
                name="position"
                labelKey="position"
                property="position"
                loadOnMount={true}
                {...props} />
            </div>
          </ParamGroup>
        </React.Fragment>
      }

      <ParamGroup
        icon="fas fa-filter"
        title="Number of Results per page">
        <div className="col-lg-3 col-12">
          <Select
            name="resultsPerPage"
            value={props.resultsPerPage}
            onChange={props.handleSelectChangeResultsPerPage}
            options={props.resultsPerPageOptions}
            placeholder="Select # of results"
            styles={selectStyles}
            isClearable={true}
          />
          Default is 20
        </div>
      </ParamGroup>

    </AppForm>
  </div>
);

export default BusinessSearchParametersPanel;
