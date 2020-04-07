import React from 'react';
import PasswordConfiguration from '../containers/password-configuration';
import EmailConfiguration from '../containers/email-configuration';
import SignInConfiguration from '../containers/sign-in-configuration';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './configuration-panel.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';

const ConfigurationPanel = props => (
  <div className="ConfigurationPanel container-fluid content-padding">
    <div className="breadcrumbs">
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="#" onClick={() => props.changePage("dashboard")}>
      <i className={"fas fa-home breadcrumb-icon"}></i>
        Main
      </Link>
      <Link color="inherit" href="#" onClick={() => props.changePage("account/configuration")}>
        <AccountCircle className={"breadcrumb-icon"} fontSize="small"/>
        Account
      </Link>
      <div>
      <i className={"fas fa-cog breadcrumb-icon"}></i>
      Configuration
      </div>
    </Breadcrumbs>
    </div>
    <div className="row">
      <div className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Configuration"
        />
      </div>
    </div>
    <div className="row conf-item">
      <PasswordConfiguration {...props} />
    </div>
    <div className="row conf-item">
      <SignInConfiguration {...props} />
    </div>
    <div className="row conf-item">
      <EmailConfiguration {...props} />
    </div>
  </div>
);

export default ConfigurationPanel;
