/* eslint-disable linebreak-style */
import React from 'react';
import './display-label.css';
import banner from '../../../resources/images/pitchdb/pitch-db-blue-icon8.png';


const textTypes = {
  DISPLAY_BIG_TITLE: 'display-big-title',
  DISPLAY_TITLE: 'display-title',
  DISPLAY_CONTENT_TITLE: 'display-content-title',
  DISPLAY_SUBTITLE: 'display-subtitle',
  DISPLAY_SUB_SUBTITLE: 'display-sub-subtitle',
  DISPLAY_NORMAL: 'display-normal',
  DISPLAY_NAV: 'display-nav',
  LABEL_IMAGE: 'label-image',
  NO_STRONG: 'no-strong',
  NO_COLOR: 'no-color'
};

const DisplayLabel = ({ textType, clickable, text, onClick }) => (
  <div className={"DisplayLabel " + textType + (clickable ? " clickable-display" : "")}>
    {textType === 'label-image' ?
      <img
        src={text}
        onClick={clickable ? onClick : () => { }}
        onError={(e)=>{e.target.onerror = null; e.target.src=banner;}}
      />
      :
      <span
        onClick={clickable ? onClick : () => { }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></span>
    }
  </div>
);

const addDefautlImage = () => (
  <div className={"DisplayLabel label-image"}>
      <img
        src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
      />
  </div>
);

export { textTypes };
export default DisplayLabel;
