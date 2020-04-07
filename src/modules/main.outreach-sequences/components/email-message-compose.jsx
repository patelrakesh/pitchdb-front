/* eslint-disable linebreak-style */
import React from 'react';
import PodcastItem from '../../../common/podcast-common/components/podcast-item';
import EpisodeItem from '../../../common/podcast-common/containers/episode-item';
import EventItem from '../../../common/event-common/components/event-item';
import BusinessItem from '../../../common/business-common/components/business-item';
import MediaItem from '../../../common/media-common/components/media-item';
import ConferenceItem from '../../../common/conference-common/components/conference-item';
import GuestItem from '../../../common/guest-common/components/guest-item';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import InputBox from '../../../common/general/components/input-box';
import Editor from '../../../common/general/components/markdown-editor';

import './email-message-compose.css';

const EmailMessageCompose = (props) => (
  
  <div className="EmailMessageCompose container-fluid">
    <div className="col-12 title">
      <DisplayLabel
        textType={textTypes.DISPLAY_TITLE}
        text={"Compose email message"} />
    </div>
    {/* {console.log("emailTrackBackItem",props.emailTrackBackItem)} */}
    {props.emailTrackBackItem && 
      <div className="Rakesh col-12">
        {props.emailTrackBackItem.userPodcast &&
          <PodcastItem podcast={props.emailTrackBackItem.userPodcast.podcast} {...props} handleSelected={() => { }}
            staticItem={true} />
        }
        {props.emailTrackBackItem.userBusiness &&
          <BusinessItem business={props.emailTrackBackItem.userBusiness.business}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.emailTrackBackItem.userEventOrganization &&
          <EventItem event={props.emailTrackBackItem.userEventOrganization.eventOrganization} {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.emailTrackBackItem.userMediaOutlet &&
          <MediaItem media={props.emailTrackBackItem.userMediaOutlet.mediaOutlet}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.emailTrackBackItem.userConference &&
          <ConferenceItem conference={props.emailTrackBackItem.userConference.conference}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.emailTrackBackItem.userGuest &&
          <GuestItem guest={props.emailTrackBackItem.userGuest.guest}  {...props} handleSelected={() => { }}
            staticItem={true} />
        }
        {props.emailTrackBackItem.userPodcastEpisode &&
          <EpisodeItem episode={props.emailTrackBackItem.userPodcastEpisode.episode}  {...props} handleSelected={() => { }}
            staticItem={true} />
        }
    </div>
    }
    {props.emailError &&
      <div className="col-12 title">
        <DisplayLabel
          textType={"display-subtitle display-error"}
          text={props.emailError} />
      </div>
    }
    {/* {console.log("props",props)} */}
    {props.stage &&
      <div className="col-12">

        {props.stage.sequence.userPodcastId &&
          <PodcastItem podcast={props.stage.sequence.userPodcastId.podcast} {...props} handleSelected={() => { }}
            staticItem={true} />
        }
        {props.stage.sequence.userPodcastEpisodeId &&
          <EpisodeItem episode={props.stage.sequence.userPodcastEpisodeId.episode}  {...props} handleSelected={() => { }}
            staticItem={true} />
        }
        {props.stage.sequence.userEventOrganizationId &&
          <EventItem event={props.stage.sequence.userEventOrganizationId.eventOrganization} {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.stage.sequence.userBusinessId &&
          <BusinessItem business={props.stage.sequence.userBusinessId.business}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.stage.sequence.userMediaOutletId &&
          <MediaItem media={props.stage.sequence.userMediaOutletId.mediaOutlet}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.stage.sequence.userConferenceId &&
          <ConferenceItem conference={props.stage.sequence.userConferenceId.conference}  {...props} handleSelected={() => { }}
            staticItem={true} inOutreachSeq={true} />
        }
        {props.stage.sequence.userGuestId &&
          <GuestItem guest={props.stage.sequence.userGuestId.guest}  {...props} handleSelected={() => { }}
            staticItem={true} />
        }
      </div>
    }
    <div className="row edition-area">
      {props.state &&
        <div className="col-12">
          <DisplayLabel
            text={`Using ${props.stage.sequence.emailFrom} to send this email`}
          />
        </div>
      }
      <div className="col-12 edition-item">
        <InputBox
          box={true}
          type={"text"}
          name={"subject"}
          onChange={props.handleInputChange}
          value={props.subject}
          inputType={"podcast-search-field"}
          placeholder={"Subject"}
        />
      </div>
      <div className="col-12 edition-item">
        <Editor />
      </div>
      <div className="col-6 offset-lg-6 offset-0 col-lg-3 edition-item">
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={props.closeModal}
          text={"Cancel"}
        />
      </div>
      <div className="col-6 col-lg-3 edition-item">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={props.sendEmailMessage}
          text={"Send email"}
        />
      </div>
    </div>
  </div>
);

export default EmailMessageCompose;
