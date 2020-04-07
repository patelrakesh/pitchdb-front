/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import StageCategory from '../containers/stage-category';
import SequenceDetail from '../../../common/sequences-common/components/sequence-detail';
import './outreach-sequences-panel.css';
import Divider from '@material-ui/core/Divider';

const OutreachSequencesPanel = props => (
  <div id="outreach-panel" className="OutreachSequencesPanel col content-padding">
    <div className="row">
      <div className="col content-title-cont">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Mailbox"
        />
        <Divider className="divider"/>
      </div>
    </div>
    {props.outreachSequenceDetail &&
      <SequenceDetail sequence={props.outreachSequenceDetail} {...props} />
    }
    {!props.outreachSequenceDetail &&
      <React.Fragment>
        {props.primaryAccount && props.primaryAccount === 'none' ?
          <React.Fragment>
            <div className="row no-account">
              <div className="col-12">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUBTITLE}
                  text={"No email account"} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-12">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={"You haven't set up an email account for your sequences yet. Please go to your profile configuration to set up a new account."} />
              </div>
              <div className="col-lg-3 col-12">
                <ActionButton
                  buttonType={buttonTypes.MAIN_ACTION}
                  onClick={() => props.changePage('account/configuration')}
                  text={"Go to configuration"}
                />
              </div>
            </div>
          </React.Fragment>
          :
          <div className="row account">
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'waiting'} />
            </div>
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'sent'} />
            </div>
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'opened'} />
            </div>
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'replied'} />
            </div>
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'booked'} />
            </div>
            <div className="col stage-col">
              <StageCategory
                {...props}
                category={'postponed'} />
            </div>
          </div>
        }
      </React.Fragment>
    }
  </div>
);

export default OutreachSequencesPanel;
