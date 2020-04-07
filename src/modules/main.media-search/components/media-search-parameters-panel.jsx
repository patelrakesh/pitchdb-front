/* eslint-disable linebreak-style */
import React from 'react';
import Select from 'react-select';
import AppForm from '../../../common/general/components/app-form';
import LocationParameters from '../../../common/search-common/containers/location-parameters';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import RadioGroup from '../../../common/general/components/radio-group';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import '../../../common/general/styles/parameters.css';
import './media-search-parameters-panel.css';

const MediaSearchParametersPanel = (props) =>
  <div className="MediaSearchParametersPanel col-lg-11 col">
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
            radioOptions={props.mediaType}
            selectedOption={props.type}
            inputName="type"
          />
        </div>
      </ParamGroup>

      {props.type !== 'magazine' &&
        <LocationParameters {...props} />
      }

      <ParamGroup
        icon="fas fa-key"
        title="Position">
        <div className="col-lg-4 col-12">
          <Select
            name="position"
            value={props.position}
            onChange={props.handlePosition}
            options={props.positionsList}
            placeholder="Select position"
            styles={selectStyles}
            isOptionSelected={(option) => option.position === props.position}
            getOptionLabel={(option) => option.position}
            isClearable={true}
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-key"
        title="Genre">
        <div className="col-lg-4 col-12">
          <Select
            name="genre"
            value={props.genre}
            onChange={props.handleGenre}
            options={props.genreList}
            placeholder="Select genre"
            styles={selectStyles}
            isOptionSelected={(option) => option.genre === props.genre}
            getOptionLabel={(option) => option.genre}
            isClearable={true}
          />
        </div>
      </ParamGroup>

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
  </div>;

export default MediaSearchParametersPanel;