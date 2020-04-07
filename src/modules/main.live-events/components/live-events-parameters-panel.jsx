/* eslint-disable linebreak-style */
import React from 'react';
import Select from 'react-select';
import AppForm from '../../../common/general/components/app-form';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import LocationParameters from '../../../common/search-common/containers/location-parameters';
import RadioGroup from '../../../common/general/components/radio-group';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import 'react-datepicker/dist/react-datepicker.css';
import './live-events-parameters-panel.css';
import '../../../common/general/styles/parameters.css';

const LiveEventsParametersPanel = props => (
  <div className="LiveEventsParametersPanel col-lg-11 col">
    <AppForm onSubmit={() => props.search(0, true)}>
      <ParamGroup>
        <div className="col-12 col-lg-7 InputBox keywords-input">
          <KeywordsParameter {...props} noMin={true} />
        </div>
      </ParamGroup>
      <ParamGroup
        icon="fas fa-filter"
        title="Type">
        <div className="col type-filter">
          <RadioGroup
            handleOptionChange={props.handleInputChange}
            radioOptions={props.eventOrgTypes}
            selectedOption={props.typeSearch}
            inputName="typeSearch"
          />
        </div>
      </ParamGroup>

      <LocationParameters {...props} paramLabel={
        props.typeSearch === 'planner' ?
          "Planner location" : "School location"
      } />

      {props.typeSearch === 'planner' &&
        <React.Fragment>
          <ParamGroup
            icon="fas fa-filter"
            title="Planner contact's role">
            <div className="col-12 col-lg-3">
              <Select
                name="role"
                value={props.role}
                onChange={props.handleRole}
                options={props.rolesList}
                placeholder='Select role'
                styles={selectStyles}
                isClearable={true}
              />
            </div>
          </ParamGroup>
        </React.Fragment>
      }

      {props.typeSearch === 'principal' &&
        <ParamGroup
          icon="fas fa-filter"
          title="School type">
          <div className="col-12 col-lg-3">
            <Select
              name="schoolType"
              value={props.schoolType}
              onChange={props.handleSchoolType}
              options={props.schoolTypesList}
              placeholder='Select school type'
              styles={selectStyles}
              isClearable={true}
            />
          </div>
        </ParamGroup>
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
  </div >
);

export default LiveEventsParametersPanel;
