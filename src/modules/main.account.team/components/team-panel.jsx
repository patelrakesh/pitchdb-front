import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import InputBox from '../../../common/general/components/input-box';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import './team-panel.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';

const TeamPanel = props => (
  <div className="TeamPanel container-fluid content-padding">
    <div className="breadcrumbs">
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="#" onClick={() => props.changePage("dashboard")}>
      <i className={"fas fa-home"}></i>
        Main
      </Link>
      <Link color="inherit" href="#" onClick={() => props.changePage("account/configuration")}>
        <AccountCircle fontSize="small"/>
        Account
      </Link>
      <div>
      <i className={"fas fa-users "}></i>
      Team
      </div>
    </Breadcrumbs>
    </div>
    <div className="row">
      <div className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Team"
        />
      </div>
    </div>
    {!props.user.teamId ?
      <div className="row">
        <div className="col-12 col-lg-5 align-self-center no-team">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"You don't have a team yet, create it and start inviting members."} />
        </div>
        <div className="offset-4 col-4 offset-lg-0 col-lg-2 align-self-center">
          <ActionButton
            buttonType={buttonTypes.MAIN_ACTION}
            onClick={props.createTeam}
            text={"Create team"}
          />
        </div>
      </div>
      :
      <div className="row invite-input-area">
        <div className="col-12 align-self-center">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Invite new members to your team"} />
        </div>
        <div className="col-12 align-self-center">
          <div className="row input-invitation">
            <div className="col-12 col-lg-5 align-self-center">
              <InputBox
                box={true}
                type={"email"}
                name={"invEmail"}
                onChange={props.handleInputChange}
                value={props.invEmail}
                inputType={"podcast-search-field"}
                placeholder={"someone@email.com"}
              />
            </div>
            <div className="offset-3 offset-lg-0 col-6 col-lg-2 align-self-center">
              <ActionButton
                buttonType={buttonTypes.MAIN_ACTION}
                onClick={props.issueInvitation}
                text={"Send invitation"}
              />
            </div>
          </div>
        </div>
        {props.team ?
          <div className="col-12">
            {props.users.map((user, index) => {
              return <div className="row member-row" key={index}>
                <div className="col-12 col-lg-4 align-self-center">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUB_SUBTITLE}
                    text={user.name + (user.email === props.user.email ? " (me)" : '')} />
                </div>
                <div className="col-12 col-lg-3 align-self-center">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={user.email} />
                </div>
                <div className="col-12 col-lg-2 align-self-center">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={commonDataParsing.toTitleCase(user.role)} />
                </div>
                {props.user.role === 'admin' && user.email !== props.user.email &&
                  <div className="col-12 col-lg-3 align-self-center">
                    <ActionButton
                      buttonType={buttonTypes.SECONDARY_ACTION}
                      onClick={() => props.removeMember(index)}
                      text={"Remove member"}
                    />
                  </div>
                }
              </div>;
            })}
          </div>
          :
          ''
        }
      </div>
    }
  </div>
);

export default TeamPanel;
