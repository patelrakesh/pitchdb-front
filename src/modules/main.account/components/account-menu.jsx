import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import React from 'react';
import './account-menu.css';

export default props =>
  <div className="header-drop-menu container-fluid">
    <div className="row">
      <div className="col-10 offset-1 col-sm-7 offset-sm-3">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={() => props.changePage("payment/credits")}
          text={"Get more pitches"}
        />
      </div>
    </div>
    <div className="row header-menu-item"
      onClick={() => props.changePage("account/configuration")}>
      <div className="col-1 align-self-center">
        <i className="fas fa-cog"></i>
      </div>
      <div className="col-10 align-self-center">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Configuration"} />
      </div>
    </div>
    <div className="row header-menu-item"
      onClick={() => props.changePage("account/team")}>
      <div className="col-1 align-self-center">
        <i className="fas fa-users"></i>
      </div>
      <div className="col-10 align-self-center">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Team"} />
      </div>
    </div>
    {props.user.privileges.includes("superAdmin") &&
      <div className="row header-menu-item"
        onClick={() => props.changePage("account/super-admin-users")}>
        <div className="col-1 align-self-center">
          <i className="fas fa-user-cog"></i>
        </div>
        <div className="col-10 align-self-center">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Super Admin - Users"} />
        </div>
      </div>
    }
    {props.user.privileges.includes("superAdmin") &&
      <div className="row header-menu-item"
        onClick={() => props.changePage("account/super-admin-searches")}>
        <div className="col-1 align-self-center">
          <i className="fas fa-search"></i>
        </div>
        <div className="col-10 align-self-center">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Super Admin - Searches"} />
        </div>
      </div>
    }
    <div className="row header-menu-item"
      onClick={props.signOut}>
      <div className="col-1 align-self-center">
        <i className="fas fa-sign-out-alt"></i>
      </div>
      <div className="col-10 align-self-center">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Sign-out"} />
      </div>
    </div>
    {props.adminMode &&
      <div className="row header-menu-item"
        onClick={props.backToAdmin}>
        <div className="col-1 align-self-center">
          <i className="fas fa-sign-out-alt"></i>
        </div>
        <div className="col-10 align-self-center">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Back to Admin account"} />
        </div>
      </div>
    }
  </div>;