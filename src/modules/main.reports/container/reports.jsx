import React, { Component } from 'react';
import ReportsPanel from '../components/reports-panel';
import chartApi from '../../../api/routes/charts-api';
import activityApi from '../../../api/routes/activity-api';
import dataFormatter from '../util/data-formatter';
import querystring from 'querystring';
import moment from 'moment';
import async from 'async';

const CHART_SUMMARY = 'summary';
const CHART_AMOUNT = 'amount';
const CHART_DATE_FORMAT = 'YYYY-MM-DD';

class Reports extends Component {
  constructor (props) {
    super(props);

    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);

    this.state = {
      activityData: null,

      summaryData: null,
      updatedSummaryData: null,

      dateTo: new Date(),
      dateStart: dateFrom,
      amountData: null,
      updatedAmountData: null,

      maxAmountValue: 0,

      summaryTimePeriod: '',
      amountTimePeriod: ''
    };
    this.functions = {
      handleDateStart: this.handleDateStart,
      handleDateTo: this.handleDateTo,
      changeDateRange: this.changeDateRange
    };

  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    async.parallel([
      callback => this.loadActivity(callback),
      callback => this.loadSummary(false, callback),
      callback => this.loadAmounts(false, callback),
    ], (err) => {
      if (err) this.props.finishLoading(true, 'An error occured while loading your data');
      else {
        this.setTimePeriod(CHART_SUMMARY);
        this.setTimePeriod(CHART_AMOUNT);
        this.props.changeLoadingMessage();
      }
    });
  }

  handleDateStart = date => {
    this.setState({ dateStart: date });
  }

  handleDateTo = date => {
    this.setState({ dateTo: date });
  }

  loadActivity = (callback) => {
    activityApi.outreachActivity()
      .then(response => {
        this.setState({ activityData: response.data });
        callback();
      })
      .catch((err) => { callback(err); });
  }

  loadSummary = (updated, callback) => {

    let queryParams = {
      dateStart: moment(this.state.dateStart).format(CHART_DATE_FORMAT),
      dateTo: moment(this.state.dateTo).format(CHART_DATE_FORMAT),
    };

    chartApi.stageSummary(querystring.stringify(queryParams))
      .then(response => {
        let data = dataFormatter.formatSummary(response.data);
        let updateObject = {};
        if (updated)
          updateObject.updatedSummaryData = data;
        else
          updateObject.summaryData = data;

        this.setState(updateObject);
        callback();
      })
      .catch((err) => { callback(err); });
  }

  loadAmounts = (updated, callback) => {

    let queryParams = {
      dateStart: moment(this.state.dateStart).format(CHART_DATE_FORMAT),
      dateTo: moment(this.state.dateTo).format(CHART_DATE_FORMAT),
      period: 'daily'
    };

    chartApi.stageAmounts(querystring.stringify(queryParams))
      .then(response => {
        let seriesData = dataFormatter.formatAmounts(response.data, new Date(this.state.dateStart.getTime()), this.state.dateTo);
        let updateObject = {
          maxAmountValue: seriesData.maxAmount + 1
        };
        if (updated)
          updateObject.updatedAmountData = seriesData.series;
        else
          updateObject.amountData = seriesData.series;
        this.setState(updateObject);
        callback();
      })
      .catch((err) => { callback(err); });
  }

  setTimePeriod = (chartType) => {
    let timeperiod = moment(this.state.dateStart).format(CHART_DATE_FORMAT);
    timeperiod += ' - ' + moment(this.state.dateTo).format(CHART_DATE_FORMAT);
    this.setState({
      [`${chartType}TimePeriod`]: timeperiod
    });
  }

  changeDateRange = () => {
    this.props.changeLoadingMessage('Loading');

    async.parallel([
      callback => this.loadSummary(false, callback),
      callback => this.loadAmounts(false, callback),
    ], (err) => {
      if (err) this.props.finishLoading(true, 'An error occured while loading your data');
      else {
        this.setTimePeriod(CHART_SUMMARY);
        this.setTimePeriod(CHART_AMOUNT);
        this.props.changeLoadingMessage();
      }
    });
  }

  render = () => <ReportsPanel {...this.state} {...this.functions} />
}

export default Reports;