import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import AccountMenu from '../../main.account/components/account-menu';
import LoadingIcon from '../../../common/general/components/loading-icon';
import './header-panel.css';
import banner from '../../../resources/images/pitchdb/pitch-db-blue.png';

const HeaderPanel = props => (
  <div className="HeaderPanel row row-header">
    <div className="banner align-self-center offset-2 offset-lg-0 col-6 col-lg-3">
      <DisplayLabel
        textType={"label-image"}
        text={banner} />
    </div>
    <div className="user-data align-self-center col-3 offset-lg-6 offset-1"
      onClick={props.toggleMenu}>
      <div className="row d-flex">
        <div className="col-auto align-self-center">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="col-auto d-none d-lg-block align-self-center">
          <DisplayLabel
            textType={"header-text"}
            text={props.user.name} />
          {!props.loadingCredits ?
            <DisplayLabel
              textType={"header-text color-tertiary"}
              text={`${props.remaining} pitches`} />
            :
            <LoadingIcon />
          }
        </div>
        <div className="ml-auto col-auto d-none d-xl-block align-self-center menu-dropdown-cont">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {props.menuOpen &&
        <AccountMenu {...props} />
      }
    </div>
  </div>
);

export default HeaderPanel;
