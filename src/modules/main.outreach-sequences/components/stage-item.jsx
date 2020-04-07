/* eslint-disable linebreak-style */
import React from 'react';
import Modal from 'react-aria-modal';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import EmailMessageCompose from './email-message-compose';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import './stage-item.css';

const TYPE_PODCAST = 'Podcast';
const TYPE_EPISODE = 'Episode';
const TYPE_EVENT = 'Event Planner';
const TYPE_BUSINESS = 'Business';
const TYPE_MEDIA = 'Media Outlet';
const TYPE_CONFERENCE = 'Conference';
const TYPE_GUEST = 'Guest';

const StageItem = props => (
  <div>
    {props.modalIsOpen &&
      <Modal
        titleId={"podcast-detail-reviews"}
        verticallyCenter={true}
        focusDialog={true}>
        <EmailMessageCompose {...props} />
      </Modal>
    }
    <div className="row StageItem" onClick={props.handleSelection}>
      <div className="col-12 stage-title">
        <div className="row">
          <div className="col-lg-10 col-9">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={props.trimTitle(
                props.stage.sequence.userPodcastId ? props.stage.sequence.userPodcastId.podcast.title :
                  props.stage.sequence.userPodcastEpisodeId ? props.stage.sequence.userPodcastEpisodeId.episode.title :
                    props.stage.sequence.userEventOrganizationId ?
                      (props.stage.sequence.userEventOrganizationId.eventOrganization.dataFileType == 1 ?
                        props.stage.sequence.userEventOrganizationId.eventOrganization.schoolName : props.stage.sequence.userEventOrganizationId.eventOrganization.organization) :
                      props.stage.sequence.userBusinessId ?
                        (props.stage.sequence.userBusinessId.business.companyName ?
                          props.stage.sequence.userBusinessId.business.companyName : props.stage.sequence.userBusinessId.business.organization) :
                        props.stage.sequence.userMediaOutletId ? props.stage.sequence.userMediaOutletId.mediaOutlet.companyName :
                          props.stage.sequence.userConferenceId ? props.stage.sequence.userConferenceId.conference.eventName :
                          props.stage.sequence.userGuestId.guest.fullName)} />
          </div>
          <div className="col-1 remove-icon-div">
            <span className="remove-span"
              onClick={(e) => props.issueRemoveSequence(props.index, e)}>
              <i className="fas fa-times"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-9">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUB_SUBTITLE}
              text={props.stage.sequence.userPodcastId ? TYPE_PODCAST :
                props.stage.sequence.userPodcastEpisodeId ? TYPE_EPISODE :
                  props.stage.sequence.userEventOrganizationId ? TYPE_EVENT :
                    props.stage.sequence.userBusinessId ? TYPE_BUSINESS :
                      props.stage.sequence.userMediaOutletId ? TYPE_MEDIA :
                        props.stage.sequence.userConferenceId ? TYPE_CONFERENCE :
                        TYPE_GUEST} />
          </div>
          <div className="col-3 stage-icon">
            {props.getStageIcon()}
          </div>
        </div>
        <div className="row">
          <div className="col-12 stage-item-date">
            <DisplayLabel
              text={commonDataParsing.parseDate(props.stage.date)}
              textType={`${textTypes.DISPLAY_NORMAL} color-tertiary`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StageItem;
