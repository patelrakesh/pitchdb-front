import React from 'react';
import AppForm from '../../../common/general/components/app-form';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import InputBox from '../../../common/general/components/input-box';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import './forgot-password.css';

let ForgotPassword = (props) => (
  <>
    <div className="col-12">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUBTITLE}
        text={"Reset Password"} />
    </div>
    {!props.emailSent ?
      <div className="col-12">
        <AppForm onSubmit={props.resetPassword}>
          <div className="row">
            <div className="col-12 password-explain-text">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={"Enter your account's email address and we will reset and send you a provisional password"} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 forgot-email-input">
              <InputBox
                box={true}
                type={"email"}
                name={"email"}
                onChange={props.handleInputChange}
                value={props.email}
                placeholder={"someone@email.com"}
                required={true}
                min={3}
                max={40}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <ActionButton
                buttonType={buttonTypes.SECONDARY_ACTION}
                text={"Cancel"}
                type={'button'}
                onClick={props.toggleForgotPassword}
              />
            </div>
            <div className="col-12 col-sm-6">
              <ActionButton
                buttonType={buttonTypes.MAIN_ACTION}
                text={"Reset Password"}
                type={'submit'}
              />
            </div>
          </div>
        </AppForm>
      </div>
      :
      <>
        <div className="col-12 password-explain-text">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"An email has been sent to the address you provided if there is a user account associated with it"} />
        </div>
        <div className="col-12 offset-0 offset-sm-2 col-sm-8">
          <ActionButton
            buttonType={buttonTypes.SECONDARY_ACTION}
            text={"Back to sign in screen"}
            type={'button'}
            onClick={props.toggleForgotPassword}
          />
        </div>
      </>
    }
  </>
);

export default ForgotPassword;