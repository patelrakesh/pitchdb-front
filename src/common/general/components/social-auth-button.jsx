import React from 'react';
import googleLogo from '../../../resources/button-icons/g-logo.png';
import linkedinLogo from '../../../resources/button-icons/l-logo.png';
import facebookLogo from '../../../resources/button-icons/f-logo.png';
import microsoftLogo from '../../../resources/button-icons/m-logo.png';
import networkConstants from '../constants/networks';
import changeCase from 'change-case';
import './social-auth-button.css';

const SocialAuthButton = ({ socialSite, onClick, idPrefix }) => (
  <button
    className={"social-auth-button align-items-center " + socialSite}
    id={idPrefix + socialSite}
    onClick={onClick}>
    <div className='btn-icon d-flex align-items-center'>
      <img src={
        socialSite === networkConstants.GOOGLE ? googleLogo :
          socialSite === networkConstants.LINKEDIN ? linkedinLogo :
            socialSite === networkConstants.FACEBOOK ? facebookLogo : microsoftLogo
      }
      />
    </div>
    <span className='btn-text d-flex align-items-center'>
      {`Sign in with ${changeCase.titleCase(socialSite)}`}
    </span>
  </button>
);

export default SocialAuthButton;