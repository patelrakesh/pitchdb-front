import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ReactTooltip from 'react-tooltip';
import './navigation-item.css';

const NavigationItem = ({ dataId, onClick, isActive, minimizedNavigation, isMinimized, text, icon, link }) => (
  <a data-tip data-for={dataId} href={link} className="NavigationItem-anchor"
    onClick={(e) => { e.preventDefault(); onClick(); }}>
    <div className={"NavigationItem row d-lg-flex" + (isActive ? " nav-active" : "") +
      (minimizedNavigation ? " d-none" : "")}>
      {!minimizedNavigation &&
        <div className={"align-self-center navigation-text" + (isMinimized ? " nav-hidden" : " col-9")}>
          <DisplayLabel
            textType={"display-nav"}
            text={text} />
        </div>
      }
      <div className={"align-self-center navigation-icon col justify-content-center d-flex"}>
        <i className={"fas " + icon}></i>
      </div>
    </div >
    {minimizedNavigation &&
      <ReactTooltip id={dataId} place="right" type="dark" effect="solid" border={true} delayShow={300}>
        <span>{text}</span>
      </ReactTooltip>
    }
  </a>
);

export default NavigationItem;
