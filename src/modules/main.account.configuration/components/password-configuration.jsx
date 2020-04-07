import React from 'react';
import InputBox from '../../../common/general/components/input-box';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './password-configuration.css';

export default ({ currentMethod, formVisible, onChange, enableForm, password, newPassword, reNewPassword, changePassword, disableForm, passwordFitsRegex, passwordsMatch }) => (
  <div className="PasswordConfiguration col-12">
    <div className="row explain-sign">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Password"} />
      </div>
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={currentMethod === "PitchDB credentials" ? "Change the password you use to sign-in into PitchDB" :
            "You are currently using an external method to sign-in into PitchDB"} />
      </div>
    </div>
    {!formVisible && currentMethod === "PitchDB credentials" &&
      <div className="row">
        <div className="offset-2 col-8 offset-lg-0 col-lg-3">
          <ActionButton
            buttonType={buttonTypes.SECONDARY_ACTION}
            onClick={enableForm}
            text="Update Password"
          />
        </div>
      </div>
    }
    {formVisible &&
      <>
        <div className="row">
          <div className="col-md-6 col-12">
            <InputBox
              box={true}
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Current Password"
              value={password}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 passwords-tip">
            <DisplayLabel
              text={"Your password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number"}
              textType={textTypes.DISPLAY_NORMAL}
            />
          </div>
          <div className="col-md-6 col-12">
            <InputBox
              box={true}
              type="password"
              name="newPassword"
              onChange={onChange}
              placeholder="New Password"
              value={newPassword}
            />
          </div>
          <div className="col-12 passwords-tip">
            <DisplayLabel
              text={newPassword ? ((!passwordFitsRegex) ? "Your password is too weak" : "Your password is strong enough") : ""}
              textType={"display-normal " + (passwordFitsRegex ? "display-success" : "display-error")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <InputBox
              box={true}
              type="password"
              name="reNewPassword"
              onChange={onChange}
              placeholder="Retype new Password"
              value={reNewPassword}
            />
          </div>
          <div className="col-12 passwords-tip">
            <DisplayLabel
              text={reNewPassword ? ((!passwordsMatch) ? "Passwords do not match" : "Passwords match") : ""}
              textType={"display-normal " + (passwordsMatch ? "display-success" : "display-error")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-lg-3">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={disableForm}
              text="Cancel"
            />
          </div>
          <div className="col-6 col-lg-3">
            <ActionButton
              buttonType={buttonTypes.MAIN_ACTION}
              onClick={changePassword}
              text="Update"
              disabled={!passwordsMatch || !passwordFitsRegex}
            />
          </div>
        </div>
      </>
    }
  </div>
);
