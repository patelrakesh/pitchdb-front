import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import LoadingIcon from '../../../common/general/components/loading-icon';
import commonDataParser from '../../../common/general/util/common-data-parsing';
import './latest-activity.css';

export default ({ activityData }) =>
  <div className="LatestActivity">
    {activityData ?
      <React.Fragment>
        {activityData.map((activity, index) =>
          <div key={index} className="row activity-item">
            <div className="col-auto">
              <DisplayLabel
                text={`${commonDataParser.parseJSDateHuman(activity.date)}:`}
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
              />
            </div>
            <div className="col-lg-auto col-12">
              <DisplayLabel
                text={activity.message}
                textType={textTypes.DISPLAY_NORMAL}
              />
            </div>
          </div>
        )}
      </React.Fragment>
      :
      <div className="loading-activity">
        <LoadingIcon size="loading-huge" />
      </div>
    }
  </div>;