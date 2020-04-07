import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import InputBox from '../../../common/general/components/input-box';
import SocialAuthButton from '../../../common/general/components/social-auth-button';
import AppForm from '../../../common/general/components/app-form';
import networkConstants from '../../../common/general/constants/networks';
import './authentication.css';

let Authentication = ({ signInOrUp, isSignIn, regularSignIn, handleInputChange, email, password, toggleForgotPassword }) => (
  <>
    <div className="col-12 social justify-content-center">
      <SocialAuthButton
        socialSite={networkConstants.LINKEDIN}
        onClick={() => signInOrUp(networkConstants.LINKEDIN)}
      />
    </div>
    <div className="col-12 social justify-content-center">
      <SocialAuthButton
        socialSite={networkConstants.GOOGLE}
        onClick={() => signInOrUp(networkConstants.GOOGLE)}
      />
    </div>
    <div className="col-12 social justify-content-center">
      <SocialAuthButton
        socialSite={networkConstants.FACEBOOK}
        onClick={() => signInOrUp(networkConstants.FACEBOOK)}
      />
    </div>
    <div className="col-12 social justify-content-center">
      <SocialAuthButton
        socialSite={networkConstants.MICROSOFT}
        onClick={() => signInOrUp(networkConstants.MICROSOFT)}
      />
    </div>
    {isSignIn &&
      <div className="col-12">
        <AppForm onSubmit={regularSignIn}>
          <div className="row regular-auth-section">
            <div className="col-12 regular-auth-label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text={"Sign In with PitchDB's credentials"} />
            </div>
          </div>
          <div className="row credentials-cont">
            <div className="col-12 credentials-input">
              <InputBox
                box={true}
                type={"email"}
                name={"email"}
                onChange={handleInputChange}
                value={email}
                placeholder={"someone@email.com"}
                required={true}
                min={3}
                max={40}
              />
            </div>
            <div className="col-12 credentials-input">
              <InputBox
                box={true}
                type={"password"}
                name={"password"}
                onChange={handleInputChange}
                value={password}
                placeholder={"Password"}
                required={true}
                min={6}
                max={40}
              />
            </div>
            <div className="col-12 forgot-col">
              <DisplayLabel
                clickable={true}
                text='Forgot your password?'
                textType="display-normal color-clickable"
                onClick={toggleForgotPassword}
              />
            </div>
          </div>
          <div className="row regular-auth-button">
            <div className="col-8 offset-2">
              <ActionButton
                buttonType={buttonTypes.MAIN_ACTION}
                text={"Sign In"}
                type={'submit'}
              />
            </div>
          </div>
        </AppForm>
      </div>
    }
  </>
);

export default Authentication;
