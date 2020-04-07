/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';

import './dashboard-panel.css';
import Divider from '@material-ui/core/Divider';

const DashboardPanel = ({ changePage }) => (
  <div className="DashboardPanel col-sm-8 offset-sm-2 col content-padding">
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_BIG_TITLE}
          text="Welcome to  PitchDB"
        />
        <Divider className="divider" />
      </div>
      <div className="col-12">
        <DisplayLabel
          textType={`${textTypes.DISPLAY_TITLE} ${textTypes.NO_COLOR} ${textTypes.NO_STRONG}`}
          text="Simple solution for booking speaking engagements"
        />
      </div>
      <div className="offset-1 col-10 explain-dashboard">
        <DisplayLabel
          textType={`${textTypes.DISPLAY_TITLE} ${textTypes.NO_COLOR} ${textTypes.NO_STRONG}`}
          text="Use the navigation bar on the left to easily find contacts or companies within different categories, or simply click one of our search categories below and see how PitchDB works!"
        />
      </div>
    </div>
    <div className="icons-container">
    <div className="item-container">
        <div className="offset-items">
          <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/officel/80/000000/apple-podcasts.png" />
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={"Podcasts"}
          />
        </div>
        <DisplayLabel
          textType={textTypes.LABEL_IMAGE}
          onClick={() => changePage('podcast-search')}
          clickable={true}
          text={"https://img.icons8.com/metro/26/000000/search.png"}
        />
      </div>
      <div className="item-container">
        <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/color/96/000000/school-building.png" />
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Organizations"
          />
        <DisplayLabel
          textType={textTypes.LABEL_IMAGE}
          onClick={() => changePage('live-events')}
          clickable={true}
          text={"https://img.icons8.com/metro/26/000000/search.png"}
        />
      </div>
      <div className="item-container">
        <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/dusk/64/000000/tv.png" />
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text="Media Outlets"
        />
        <DisplayLabel
          textType={textTypes.LABEL_IMAGE}
          onClick={() => changePage('media-search')}
          clickable={true}
          text={"https://img.icons8.com/metro/26/000000/search.png"}
        />
      </div>
      <div className="item-container">
        <div className="offset-items">
          <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/color/96/000000/microphone.png" />
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Conferences"
          />
        </div>
        <DisplayLabel
          textType={textTypes.LABEL_IMAGE}
          onClick={() => changePage('conference-search')}
          clickable={true}
          text={"https://img.icons8.com/metro/26/000000/search.png"}
        />
      </div>
    </div>
  </div>
);

export default DashboardPanel;