import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import SocialAuthButton from '../../../common/general/components/social-auth-button';
import networkConstants from '../../../common/general/constants/networks';
import './sign-in-configuration-panel.css';

export default props => (
  <div className="SignInConfigurationPanel col-12">
    <div className="row explain-sign">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Sign-in"} />
      </div>
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Configure the way you sign-in into PitchDB"} />
      </div>
    </div>
    <div className="row current-email">
      <div className="col-auto">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Current sign-in method: "} />
      </div>
      <div className="col-auto">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.currentMethod} />
      </div>
    </div>
    <div className="row social-sign-buttons">
      <div className="col-12 sign-connect">
        <SocialAuthButton
          socialSite={networkConstants.LINKEDIN}
          onClick={() => props.connect(networkConstants.LINKEDIN)}
        />
      </div>
      <div className="col-12 sign-connect">
        <SocialAuthButton
          socialSite={networkConstants.GOOGLE}
          onClick={() => props.connect(networkConstants.GOOGLE)}
        />
      </div>
      <div className="col-12 sign-connect">
        <SocialAuthButton
          socialSite={networkConstants.FACEBOOK}
          onClick={() => props.connect(networkConstants.FACEBOOK)}
        />
      </div>
      <div className="col-12 sign-connect">
        <SocialAuthButton
          socialSite={networkConstants.MICROSOFT}
          onClick={() => props.connect(networkConstants.MICROSOFT)}
        />
      </div>
    </div>
  </div>
);