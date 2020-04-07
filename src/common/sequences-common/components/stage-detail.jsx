/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import commonDataParsing from '../../general/util/common-data-parsing';
import StageSection from './stage-section';
import './stage-detail.css';


const StageDetail = props => (
  <div className="StageDetail ">
    {props.stage.category === 'waiting' &&
      <StageSection
        stageIcon="fas fa-envelope"
        stageName="Waiting" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Created on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
      </StageSection>
    }
    {props.stage.category === 'sent' &&
      <StageSection
        stageIcon="fas fa-arrow-alt-circle-right"
        stageName="Email sent" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Sent on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
        
          <div className="stage-detail-container">
            <div className="stage-content-subject">
              <div className="subtitle">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Subject:"} />
              </div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.subject} />
            </div>
            <div className="stage-detail-content">
              <div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Message:"} />
              </div>
              <div className="message-content">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.message} />
              </div>
            </div>
          </div>
        
      </StageSection>
    }
    {props.stage.category === 'opened' &&
      <StageSection
        stageIcon="fas fa-envelope-open"
        stageName="Email opened" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Opened for the first time on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
      </StageSection>
    }
    {props.stage.category === 'replied' &&
      <StageSection
        stageIcon="fas fa-arrow-alt-circle-left"
        stageName="Email replied" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Replied on " + commonDataParsing.parseJSDateHuman(props.stage.content.emailData.date)} />
        </div>
        <div className="stage-detail-container">
            <div className="stage-content-subject">
              <div className="subtitle">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Subject:"} />
              </div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.subject} />
            </div>
            <div className="stage-detail-content">
              <div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Message:"} />
              </div>
              <div className="message-content">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.message} />
              </div>
            </div>
          </div>
      </StageSection>
    }
    {props.stage.category === 'booked' &&
      <StageSection
        stageIcon="fas fa-check-circle"
        stageName="Booked" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Booked on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
      </StageSection>
    }
    {props.stage.category === 'postponed' &&
      <StageSection
        stageIcon="fas fa-minus-circle"
        stageName="Not now" >
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Postponed on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
      </StageSection>
    }
    {props.stage.category === 'conversed' &&
      <div className="row">
        {props.stage.content.recipient ?
          <div className="col-1 stage-action-icon">
            <i className="fas fa-arrow-alt-circle-left"></i>
          </div>
          :
          <div className="col-1 stage-action-icon">
            <i className="fas fa-arrow-alt-circle-right"></i>
          </div>
        }
        <div className="col-11">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUBTITLE}
            text={props.stage.content.recipient ? "Email replied" : "Email sent"} />
        </div>
        <div className="col-12 stage-date">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={(props.stage.content.recipient ? "Replied" : "Sent") + " on " + commonDataParsing.parseJSDateHuman(props.stage.date)} />
        </div>
        <div className="stage-detail-container">
            <div className="stage-content-subject">
              <div className="subtitle">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Subject:"} />
              </div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.subject} />
            </div>
            <div className="stage-detail-content">
              <div>
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text={"Message:"} />
              </div>
              <div className="message-content">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.stage.content.message} />
              </div>
            </div>
          </div>
      </div>
    }
  </div>
);

export default StageDetail;
