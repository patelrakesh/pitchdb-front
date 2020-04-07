/* eslint-disable linebreak-style */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import ActionIcon from '../../../common/general/components/action-icon';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import Select from 'react-select';
import './user-item.css';

const UserItem = props => (
  <div className="UserItem row">
    <div className="col-12 col-lg-5">
      <div className="row">
        <div className="col-12 super-user-info">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={props.currentUser.name} />
        </div>
        <div className="col-12 super-user-info">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"(" + props.currentUser.email + ")"} />
        </div>
        <div className="col-12 super-user-info">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Last login on " + (props.currentUser.dateLastLogin ? commonDataParsing.parseDate(props.currentUser.dateLastLogin) : " - ")} />
        </div>
        <div className="col-12 super-user-info">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Registered on " + (props.currentUser.dateRegistration ? commonDataParsing.parseDate(props.currentUser.dateRegistration) : " - ")} />
        </div>
        <div className="col-12 super-user-info privileges">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={"Privileges: "} />
        </div>
        {props.currentUser.privileges && props.currentUser.privileges.length > 0 ? 
          props.currentUser.privileges.map((privilege, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="col-12 super-user-info">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={privilege}
                key={index}
              />
            </div>
          ))
        :
            <div className="col-12 super-user-info">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={"none"}
              />
            </div>
        }
        {props.currentUser.disabled ? 
          <>
          <div className="super-user-info disabled">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUBTITLE}
              text={"DISABLED"} />
          </div>
          </>
          :
          <br></br>
        }
      </div>
    </div>
    <div className="col-12 col-lg-3 super-user-info">
      <div className="row">
        <div className="col-5 col-lg-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text=
            { !props.currentUser.credits ? 
                ""
                : props.currentUser.credits.remaining === null ?
                "Unlimited pitches"
                :(props.currentUser.credits.remaining + " pitches")
            }
          />
        </div>
        <div className="col-5 col-lg-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={props.currentUser.credits && (props.currentUser.credits.used + " used")} />
        </div>
      </div>
    </div>
    <div className="col-12 col-lg-4">
      {props.bundleAdditionIndex === props.index ?
        <div className="row">
          <div className="col-8 align-self-center">
            <TextField
              id="add-credits"
              label="Add Credits"
              type="number"
              autoFocus={true}
              required={true}
              value={props.numberAdditionCredits}
              onChange={props.handleCreditsChange}
              variant="outlined"
            />
          </div>
          <div className="col-2 align-self-center confirm-icon">
            <ActionIcon
              dataId="user-item-confirm"
              tooltip="Confirm"
              icon={"fas fa-check"}
              onClick={props.addCredits}
            />
          </div>
          <div className="col-2 align-self-center confirm-icon">
            <ActionIcon
              dataId="user-item-cancel"
              tooltip="Cancel"
              icon={"fas fa-times"}
              className={"icon-negative"}
              onClick={props.cancelBundleAdditionMode}
            />
          </div>
        </div>
        :
        <div className="row">
          <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={() => props.enterCreditsAdditionMode(props.index)}
              text={"Add pitches"}
            />
          </div>
          {!props.currentUser.network &&
            <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
              <ActionButton
                buttonType={buttonTypes.SECONDARY_ACTION}
                onClick={() => props.resetPassword(props.index)}
                text={"Reset password"}
              />
            </div>
          }
          <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={() => props.removeUser(props.index)}
              text={"Remove user"}
            />
          </div>
          <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={() => props.signInAsUser(props.index)}
              text={"Account Sign In"}
            />
          </div>
          <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={() => props.changePrivileges(props.index)}
              text={"Add/Remove privilieges"}
            />
          </div>
          <div className="offset-2 offset-lg-0 col-8 col-lg-12 admin-user-action">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              id={"toggleStatus"}
              onClick={() => props.toggleStatus(props.index)}
              text={props.currentUser.disabled ? "Enable" : "Disable"}
            />
          </div>
        </div>
      }
    </div>
  </div>
);

export default UserItem;