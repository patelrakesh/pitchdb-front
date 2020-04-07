/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionButton, { buttonTypes } from '../../general/components/action-button';
import PodcastItem from '../../podcast-common/components/podcast-item';
import EpisodeItem from '../../podcast-common/containers/episode-item';
import EventItem from '../../event-common/components/event-item';
import MediaItem from '../../media-common/components/media-item';
import ConferenceItem from '../../conference-common/components/conference-item';
import BusinessItem from '../../business-common/components/business-item';
import GuestItem from '../../guest-common/components/guest-item';
import StageDetail from './stage-detail';
import EmailReport from './email-report';
import Modal from 'react-aria-modal';
import commonDataParsing from '../../general/util/common-data-parsing';
import './sequence-detail.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import ReactMarkdown from 'react-markdown';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { EventAvailable, EventBusy, Send, Drafts, AllInbox } from '@material-ui/icons';


const SequenceDetail = props => (
  <div className="SequenceDetail col content-padding">
    <div className="breadcrumbs">
    <Breadcrumbs aria-label="breadcrumb">
         <Link color="inherit" href="#" onClick={() => props.changePage("dashboard")}>
         <i className={"fas fa-home breadcrumb-icon"}></i>
           Main
         </Link>
         <Link color="inherit" href="#"  onClick={props.goBack}>
         <i className={"fas fa-envelope breadcrumb-icon"}></i>
           Mailbox
         </Link>
         {props.sequence.currentStage === 'waiting' &&
          <Typography color="textPrimary">Waiting</Typography>
         }
         {props.sequence.currentStage === 'sent' &&
          <div>
            <Send fontSize="small" className={"breadcrumb-icon"}/>
            Sent
          </div>
         }
         {props.sequence.currentStage === 'opened' &&
          <div>
            <Drafts fontSize="small" className={"breadcrumb-icon"}/>
            Opened
          </div>
         }
         {props.sequence.currentStage === 'replied' &&
          <div>
            <AllInbox fontSize="small" className={"breadcrumb-icon"}/>
            Replied
          </div>
         }
         {props.sequence.currentStage === 'booked' &&
          <div>
            <EventAvailable fontSize="small" className={"breadcrumb-icon"}/>
            Booked
          </div>
         }
         {props.sequence.currentStage === 'postponed' &&
          <div>
            <EventBusy fontSize="small" className={"breadcrumb-icon"}/>
            Postponed
          </div>
         }
         {props.sequence.currentStage === 'conversed' &&
          <div>
            <EventBusy fontSize="small" className={"breadcrumb-icon"}/>
            <Typography color="textPrimary">Not now</Typography>
          </div>
         }
       </Breadcrumbs>
    </div>
    {props.emailReportOpen &&
      <Modal
        titleId={"podcast-detail-email-report"}
        verticallyCenter={true}
        focusDialog={true}>
        <EmailReport {...props} />
      </Modal>
    }
    <>
      <div className="row">
        <div className="col-6 col-md-4 col-lg-2">
          <ActionButton
            buttonType={"secondary-action back-button"}
            onClick={props.goBack}
            text={"Go Back"}
          />
        </div>
        {props.sequence.currentStage !== 'postponed' && !props.emailReport &&
          <div className={"col-6 col-md-4 col-lg-2" + (props.sequence.currentStage !== 'replied' ? " offset-lg-6" : " offset-lg-4")}>
            {props.sequence.currentStage !== 'booked' &&
              <ActionButton
                buttonType={buttonTypes.SECONDARY_ACTION}
                onClick={() => props.openReportSequenceEmail()}
                text={"Report email"} />
            }
          </div>
        }
        {props.sequence.currentStage !== 'postponed' &&
          <div className={"col-6 col-md-4 col-lg-2" + (props.emailReport ? (props.sequence.currentStage !== 'replied' ? " offset-lg-8" : " offset-lg-6") : '')}>
            {props.sequence.currentStage !== 'booked' &&
              <ActionButton
                buttonType={buttonTypes.SECONDARY_ACTION}
                onClick={() => props.postponeSequence(props.sequence)}
                text={"Postpone"} />
            }
          </div>
        }
        {props.sequence.currentStage === 'replied' && props.sequence.currentStage !== 'postponed' &&
          <div className="col-6 col-md-4 col-lg-2">
            <ActionButton
              buttonType={buttonTypes.MAIN_ACTION}
              onClick={() => props.bookSequence(props.sequence)}
              text={"Booking obtained"}
            />
          </div>
        }
        {props.sequence.currentStage === 'postponed' &&
          <div className="col-2 offset-lg-8">
            <ActionButton
              buttonType={buttonTypes.MAIN_ACTION}
              onClick={() => props.restoreSequence(props.sequence)}
              text={"Restore"}
            />
          </div>
        }
      </div>
      <div className="row">
        <div className="col-12 sequence-data">
          {props.sequence.userPodcastId &&
            <PodcastItem podcast={props.sequence.userPodcastId.podcast} {...props} handleSelected={() => { }}
              staticItem={true} />
          }
          {props.sequence.userPodcastEpisodeId &&
            <EpisodeItem episode={props.sequence.userPodcastEpisodeId.episode}  {...props} handleSelected={() => { }}
              staticItem={true} />
          }
          {props.sequence.userEventOrganizationId &&
            <EventItem event={props.sequence.userEventOrganizationId.eventOrganization} {...props} handleSelected={() => { }}
              staticItem={true} inOutreachSeq={true} />
          }
          {props.sequence.userBusinessId &&
            <BusinessItem business={props.sequence.userBusinessId.business}  {...props} handleSelected={() => { }}
              staticItem={true} inOutreachSeq={true} />
          }
          {props.sequence.userMediaOutletId &&
            <MediaItem media={props.sequence.userMediaOutletId.mediaOutlet}  {...props} handleSelected={() => { }}
              staticItem={true} inOutreachSeq={true} />
          }
          {props.sequence.userConferenceId &&
            <ConferenceItem conference={props.sequence.userConferenceId.conference}  {...props} handleSelected={() => { }}
              staticItem={true} inOutreachSeq={true} />
          }
          {props.sequence.userGuestId &&
            <GuestItem guest={props.sequence.userGuestId.guest}  {...props} handleSelected={() => { }}
              staticItem={true} />
          }
        </div>
      </div>
      <div>
      <div className="sequence">
        <div className="sequence-detail">
          <div className="title">
            <DisplayLabel
              textType={textTypes.DISPLAY_TITLE}
              text={"Sequence"} />
          </div>

          <div className="notes title">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={`Sequence started with the email ${props.sequence.emailFrom}`} />
          </div>
          {props.sequence.stages.map((stage, index) => {
            return <StageDetail stage={stage} key={index} index={index} {...props} />;
          })}
        </div>
        <div className="divider"></div>
        <div className="notes title">
          <DisplayLabel
            textType={textTypes.DISPLAY_TITLE}
            text={"Notes"} />

            {props.sequence.notes && props.sequence.notes.length > 0 ?
              props.sequence.notes.map(({_id, title, content, date, editDate}, index) => (
                <Card className="card"
                      key={index}>
                <CardContent>
                  <div className="dates">
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                      {"Created: " + commonDataParsing.parseDate(date)}
                    </Typography>
                    {editDate &&
                      <Typography className="card-title" color="textSecondary" gutterBottom>
                        {"Last edited: " + commonDataParsing.parseDate(editDate)}
                      </Typography>
                    }
                  </div>
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUBTITLE}
                    text={title} />
                  <Typography className="card-content" variant="body" component="p">
                    <ReactMarkdown
                      source={content}
                    />
                  </Typography>
                </CardContent>
                <CardActions className="actions">
                  <Fab color="secondary" size="small" aria-label="edit" onClick={() => props.editNote(props.sequence._id, _id, content, title, date)}>
                    <EditIcon />
                  </Fab>
                  <IconButton aria-label="delete" onClick={() => props.removeNote(props.sequence._id, _id)}>
                    <DeleteIcon
                      fontSize="large"
                       />
                  </IconButton>
                </CardActions>
            </Card>
              ))
            :
            <Card className="card">
                <CardContent>
                  <div className="dates">
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        {"Created: " + commonDataParsing.parseDate(new Date)}
                    </Typography>
                  </div>
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUBTITLE}
                    text='Sample note' />
                  <Typography className="card-content" variant="body" component="p">
                      This is a sample note! If you want to create your own click on the add button below! <br></br>
                      You can add lists, titles, images and more!
                  </Typography>
                </CardContent>
                <CardActions className="actions">
                  <Fab color="secondary" size="small" aria-label="edit"  onClick={() => props.sampleEdit()}>
                    <EditIcon/>
                  </Fab>
                  <IconButton aria-label="delete " onClick={() => props.sampleDelete()}>
                    <DeleteIcon
                    fontSize="large"
                     />
                  </IconButton>
                </CardActions>
            </Card>
            }
            <Fab className="add-icon" color="primary" aria-label="add">
              <AddIcon onClick={() => props.addNote(props.sequence._id)}/>
            </Fab>
          </div>
        </div>
      </div>
    </>
  </div >
);


export default SequenceDetail;
