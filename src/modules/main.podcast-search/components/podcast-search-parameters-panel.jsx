import React from 'react';
import Select from 'react-select';
import AppForm from '../../../common/general/components/app-form';
import DatePicker from 'react-datepicker';
import RadioGroup from '../../../common/general/components/radio-group';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import 'react-datepicker/dist/react-datepicker.css';
import './podcast-search-parameters-panel.css';
import '../../../common/general/styles/parameters.css';

const PodcastFinderParametersPanel = props => (
  <div className="PodcastFinderParametersPanel col-lg-11 col">
    <AppForm onSubmit={() => props.searchPodcasts(0, true)}>
      <ParamGroup>
        <div className="col-lg-7 col-12 InputBox keywords-input">
          <KeywordsParameter {...props} />
        </div>
      </ParamGroup>
      <ParamGroup
        icon="fas fa-filter"
        title="Type">
        <div className="col type-filter">
          <RadioGroup
            handleOptionChange={props.handleInputChange}
            radioOptions={[
              {
                optionId: "podcast",
                label: "Podcasts"
              },
              {
                optionId: "episode",
                label: "Episodes"
              }
            ]}
            selectedOption={props.type}
            inputName="type"
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-filter"
        title="Genres">
        <div className="col-lg-5 col-12 align-self-center">
          <Select
            name="searchGenres"
            value={props.searchGenres}
            onChange={props.handleSelectChangeGenres}
            options={props.genresList}
            isMulti={true}
            placeholder='Select genres'
            styles={selectStyles}
            isClearable={true}
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-filter"
        title="Language">
        <div className="col-lg-3 col-12">
          <Select
            name="searchLanguage"
            value={props.searchLanguage}
            onChange={props.handleSelectChangeLanguage}
            options={props.languagesList}
            placeholder="Select language"
            styles={selectStyles}
            isClearable={true}
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-filter"
        title="Publish date range">
        <React.Fragment>
          <div className="col-lg-3 col-6 InputBox">
            <DatePicker
              selected={props.publishAfter}
              onChange={props.handleDatePublishAfter}
              placeholderText="Published after"
              className="red-border"
            />
          </div>
          <div className="col-lg-3 col-6 InputBox">
            <DatePicker
              selected={props.publishBefore}
              onChange={props.handleDatePublishBefore}
              placeholderText="Published before"
            />
          </div>
        </React.Fragment>
      </ParamGroup>

    </AppForm>
  </div>
);

export default PodcastFinderParametersPanel;
