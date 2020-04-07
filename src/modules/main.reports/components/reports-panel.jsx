/* eslint-disable linebreak-style */
import React from 'react';
import PieChart from '../../../common/charts/containers/pie';
import DailyReport from './daily-report';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import LatestActivity from './latest-activity';
import DatePicker from 'react-datepicker';
import LoadingIcon from '../../../common/general/components/loading-icon';
import './reports-panel.css';
import Divider from '@material-ui/core/Divider';

export default props =>
  <div className="ReportsPanel col-lg-12 content-padding">
    <div className="row">
      <div className="col content-title-cont">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Reports"
        />
        <Divider className="divider"/>
      </div>
      <div className="col col-lg-10 offset-0 offset-lg-1">
        <DisplayLabel
          text="Latest Activity"
          textType={textTypes.DISPLAY_SUBTITLE}
        />
      </div>
    </div>
    <div className="row">
      <div className="col col-lg-10 offset-0 offset-lg-1">
        <LatestActivity activityData={props.activityData} />
      </div>
      {/* <div className="col-12 date-range-header">
        <DisplayLabel
          text="Choose Date Range"
          textType={textTypes.DISPLAY_SUBTITLE}
        />
      </div>

      <div className="col-3 offset-2 InputBox">
        <DatePicker
          selected={props.dateStart}
          onChange={props.handleDateStart}
          placeholderText="Start date"
        />
      </div>
      <div className="col-3 InputBox">
        <DatePicker
          selected={props.dateTo}
          onChange={props.handleDateTo}
          placeholderText="End date"
        />
      </div>
      <div className="col-2">
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={props.changeDateRange}
          text={"Change date range"}
        />
      </div> */}

      <div className="col-12 col-xl-6 offset-xl-3 offset-0 pie-start">
        <div className="m-2 p-1 stage-line-chart-container">
          {props.summaryData ?
            <PieChart
              title="Outreach sequences summary"
              subtitle={props.summaryData.length > 0 ? props.summaryTimePeriod :
                ('No activity for the time period ' + props.summaryTimePeriod)
              }
              seriesData={props.summaryData}
              updatedData={props.updatedSummaryData}
            />
            :
            <div className="loading-chart">
              <LoadingIcon size="loading-huge" />
            </div>
          }
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col col-lg-10 offset-0 offset-lg-1">
        <DailyReport
          amountTimePeriod={props.amountTimePeriod}
          amountData={props.amountData}
          updatedData={props.updatedAmountData}
          maxAmountValue={props.maxAmountValue}
        />
      </div>
    </div>
  </div>;