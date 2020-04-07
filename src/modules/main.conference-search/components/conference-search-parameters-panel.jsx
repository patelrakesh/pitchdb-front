/* eslint-disable linebreak-style */
import React from 'react';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";
import AppForm from '../../../common/general/components/app-form';
import LocationParameters from '../../../common/search-common/containers/location-parameters';
import KeywordsParameter from '../../../common/search-common/components/keywords-parameter';
import ParamGroup from '../../../common/search-common/components/param-group';
import selectStyles from '../../../common/search-common/util/select-styles';
import '../../../common/general/styles/parameters.css';
import './conference-search-parameters-panel.css';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const ConferenceSearchParametersPanel = (props) =>
  <div className="ConferenceSearchParametersPanel col-lg-11 col">
    <AppForm onSubmit={() => props.search(0, true)}>
      <ParamGroup>
        <div className="col-lg-7 col-12 InputBox keywords-input">
          <KeywordsParameter {...props} noMin={true} />
        </div>
      </ParamGroup>
      <LocationParameters {...props} />
      <ParamGroup
        icon="fas fa-key"
        title="Category">
        <div className="col-lg-4 col-12">
          <Select
            name="category"
            value={props.category}
            onChange={props.handleCategory}
            options={props.categoryList}
            placeholder="Select category"
            styles={selectStyles}
            isOptionSelected={(option) => option.category === props.category}
            getOptionLabel={(option) => option.category}
            isClearable={true}
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-key"
        title="Est. Audience">
        <div className="slider-audience">
          <IOSSlider
            aria-label="ios slider"
            value={props.estAudience}
            step={null} marks={props.marks}
            valueLabelDisplay="auto"
            min={0}
            max={props.maxAudience}
            onChange={props.handleEstAudience}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={props.unknownAudience}
                onChange={props.handleUnknownAudienceCheckbox}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Include unknown estimated audience in search"
          />
        </div>
      </ParamGroup>

      <ParamGroup
        icon="fas fa-key"
        title="Est. Date">
        <div className="col-lg-4 col-12">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="date-pickers-container">
              <KeyboardDatePicker
                clearable
                format="yyyy/MM/dd"
                views={["year", "month"]}
                margin="normal"
                label="After"
                value={props.dateAfter}
                onChange={props.handleAfterDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                clearable
                margin="normal"
                label="Before"
                format="yyyy/MM/dd"
                views={["year", "month"]}
                value={props.dateBefore}
                onChange={props.handleBeforeDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
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

export default ConferenceSearchParametersPanel;


const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);