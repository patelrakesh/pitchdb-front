/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import LineChart from '../../../common/charts/containers/line';
import LoadingIcon from '../../../common/general/components/loading-icon';


export default ({ amountTimePeriod, amountData, updatedData, maxAmountValue }) => (
  <div className="row">
    <div className="col content-title-cont">
      <DisplayLabel
        text={"Daily report (" + amountTimePeriod + ")"}
        textType={textTypes.DISPLAY_SUBTITLE}
      />
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach sequences created"
            toolTipText="created"
            seriesData={amountData.waiting}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.waiting : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach emails sent"
            toolTipText="sent"
            seriesData={amountData.sent}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.sent : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach emails opened"
            toolTipText="opened"
            seriesData={amountData.opened}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.opened : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach emails replied"
            toolTipText="replied"
            seriesData={amountData.replied}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.replied : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach sequences booked"
            toolTipText="booked"
            seriesData={amountData.booked}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.booked : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
    <div className="col-12 col-xl-6">
      <div className="m-2 p-1 stage-line-chart-container">
        {amountData ?
          <LineChart
            title="Outreach sequences postponed"
            toolTipText="postponed"
            seriesData={amountData.postponed}
            maxYAxis={maxAmountValue}
            updatedData={updatedData ? updatedData.postponed : null}
          />
          :
          <div className="loading-chart">
            <LoadingIcon size="loading-huge" />
          </div>
        }
      </div>
    </div>
  </div>
);