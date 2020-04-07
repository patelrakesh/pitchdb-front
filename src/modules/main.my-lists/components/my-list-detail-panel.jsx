/* eslint-disable linebreak-style */
import React from 'react';
import PodcastItem from '../../../common/podcast-common/components/podcast-item';
import EpisodeItem from '../../../common/podcast-common/containers/episode-item';
import EventItem from '../../../common/event-common/components/event-item';
import BusinessItem from '../../../common/business-common/components/business-item';
import MediaOutletItem from '../../../common/media-common/components/media-item';
import ConferenceItem from '../../../common/conference-common/components/conference-item';
import GuestItem from '../../../common/guest-common/components/guest-item';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import PodcastDetail from '../../../common/podcast-common/containers/podcast-detail';
import EventOrganizationDetail from '../../../common/event-common/components/event-detail';
import LocalBusinessDetail from '../../../common/business-common/components/local-business-detail';
import Paginate from '../../../common/general/components/paginate';

import Modal from 'react-aria-modal';
import EmailMessageCompose from '../../main.outreach-sequences/components/email-message-compose';

import './my-list-detail-panel.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import StarsIcon from '@material-ui/icons/Stars';
import ListIcon from '@material-ui/icons/List';

const MyListDetailPanel = props => (
  <div className="MyListDetailPanel container-fluid content-padding">
    {props.modalIsOpen &&
      <Modal
        titleId={"list-tems-modal"}
        verticallyCenter={true}
        focusDialog={true}>
        <EmailMessageCompose 
          emailTrackBackItem = {props.emailTrackBackItem}
          emailError={props.emailError}
          handleInputChange={props.handleInputChange}
          subject={props.subject}
          closeModal={props.closeModal}
          sendEmailMessage={props.sendEmailMessage}
        />
      </Modal>
    }
    <div className="row lists-back-row">
      <div className="col-6 col-md-4 col-lg-2">
        <ActionButton
          buttonType={"secondary-action back-button"}
          onClick={props.backToLists}
          text={"Go Back"}
        />
      </div>
    </div>
    {!props.itemDetail &&
      <React.Fragment>
        <div id="list-header">
          {props.list &&
            <div className="row list-title-bar">
              
              <div className="list-title-info">
                <div className="col-12 col-lg-6">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_TITLE}
                    text={props.list.name} />
                </div>      
                <div className="col-12 col-lg-12">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="#" onClick={() => props.changePage("dashboard")}>
                      <i className={"fas fa-home breadcrumb-icon"}></i>
                      Main
                    </Link>
                    <Link color="inherit" href="#" onClick={props.backToLists}>
                      <ListIcon fontSize="small" className={"breadcrumb-icon"}/>
                      Lists
                    </Link>
                    <Link>
                      <StarsIcon fontSize="small" className={"breadcrumb-icon"}/>
                      {props.list.name}
                    </Link>
                    {props.type === "podcast" &&
                      <div>
                        <i className={"fas fa-podcast breadcrumb-icon"}></i>
                        Podcasts
                      </div>
                    }
                    {props.type === "episode" &&
                      <div>
                        <i className={"fas fa-podcast breadcrumb-icon"}></i>
                        Episodes
                      </div>
                    }
                    {props.type === "eventOrganization" &&
                      <div>
                        <i className={"fas fa-calendar-alt breadcrumb-icon"}></i>
                        Event Planners
                      </div>
                    }
                    {props.type === "business" &&
                      <div>
                        <i className={"fas fa-briefcase breadcrumb-icon"}></i>
                        Businesses
                      </div>
                    }
                    {props.type === "mediaOutlet" &&
                      <div>
                        <i className={"fas fa-newspaper breadcrumb-icon"}></i>
                        Media Outlets
                      </div>
                    }
                    {props.type === "conference" &&
                      <div>
                        <i className={"fas fa-microphone-alt breadcrumb-icon"}></i>
                        Conferences
                      </div>
                    }
                    {props.type === "guest" &&
                      <div>
                        <i className={"fas fa-user-tie breadcrumb-icon"}></i>
                        People
                      </div>
                    }
                  </Breadcrumbs>
                </div>
                </div>
              <div className="offset-2 offset-lg-4 col-8 col-lg-2 list-actions">
                <ActionButton
                  buttonType={buttonTypes.MAIN_ACTION}
                  onClick={() => props.connectContacts(props.list._id)}
                  text={"Get Emails"}
                />
              </div>
            </div>
          }
        </div>
        {props.list && !props.itemDetail &&
          <div id='contacts-type' className="row">
            {props.count && props.count.podcast > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'podcast' ? " selected-type" : "")}
                  onClick={() => props.changeType('podcast')}
                  text={"Podcasts (" + props.count.podcast + ")"}
                />
              </div>
            }
            {props.count && props.count.episode > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'episode' ? " selected-type" : "")}
                  onClick={() => props.changeType('episode')}
                  text={"Episodes (" + props.count.episode + ")"}
                />
              </div>
            }
            {props.count && props.count.eventOrganization > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'eventOrganization' ? " selected-type" : "")}
                  onClick={() => props.changeType('eventOrganization')}
                  text={"Event Planners (" + props.count.eventOrganization + ")"}
                />
              </div>
            }
            {props.count && props.count.business > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'business' ? " selected-type" : "")}
                  onClick={() => props.changeType('business')}
                  text={"Businesses (" + props.count.business + ")"}
                />
              </div>
            }
            {props.count && props.count.mediaOutlet > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'mediaOutlet' ? " selected-type" : "")}
                  onClick={() => props.changeType('mediaOutlet')}
                  text={"Media Outlets (" + props.count.mediaOutlet + ")"}
                />
              </div>
            }
            {props.count && props.count.conference > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'conference' ? " selected-type" : "")}
                  onClick={() => props.changeType('conference')}
                  text={"Conferences (" + props.count.conference + ")"}
                />
              </div>
            }
            {props.count && props.count.guest > 0 &&
              <div className="col-6 col-lg-2 my-podcasts-action-col">
                <ActionButton
                  buttonType={"item-list-toggle" + (props.type === 'guest' ? " selected-type" : "")}
                  onClick={() => props.changeType('guest')}
                  text={"People (" + props.count.guest + ")"}
                />
              </div>
            }
          </div>
        }
        {props.type === 'podcast' &&
          <div className='col-12'>
            {props.items.map((myPodcast, index) =>
              <PodcastItem {...myPodcast.userPodcast} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myPodcast._id, e)}
                openEmail={(e) => props.openEmail(myPodcast._id, e,myPodcast)}
                findEmail={(e) => props.findEmail(e, props.list._id, myPodcast._id, myPodcast.userPodcast._id)} />
            )}
          </div>
        }
        {props.type === 'episode' &&
          <div className='col-12'>
            {props.items.map((myEpisode, index) =>
              <EpisodeItem {...myEpisode.userPodcastEpisode} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myEpisode._id, e)}
                openEmail={(e) => props.openEmail(myEpisode._id, e, myEpisode)}
                findEmail={(e) => props.findEmail(e, props.list._id, myEpisode._id, myEpisode.userPodcastEpisode._id)} />
            )}
          </div>
        }
        {props.type === 'eventOrganization' &&
          <div className='col-12'>
            {props.items.map((myEvent, index) =>
              <EventItem {...myEvent.userEventOrganization} event={myEvent.userEventOrganization.eventOrganization} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myEvent._id, e)}
                openEmail={(e) => props.openEmail(myEvent._id, e, myEvent)}
                findEmail={(e) => props.findEmail(e, props.list._id, myEvent._id, myEvent.userEventOrganization._id)} />
            )}
          </div>
        }
        {props.type === 'business' &&
          <div className='col-12'>
            {props.items.map((myBusiness, index) =>
              <BusinessItem {...myBusiness.userBusiness} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myBusiness._id, e)}
                openEmail={(e) => props.openEmail(myBusiness._id, e, myBusiness)}
                findEmail={(e) => props.findEmail(e, props.list._id, myBusiness._id, myBusiness.userBusiness._id)} />
            )}
          </div>
        }
        {props.type === 'mediaOutlet' &&
          <div className='col-12'>
            {props.items.map((myMedia, index) =>
              <MediaOutletItem {...myMedia.userMediaOutlet} media={myMedia.userMediaOutlet.mediaOutlet} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myMedia._id, e)}
                openEmail={(e) => props.openEmail(myMedia._id, e, myMedia)}
                findEmail={(e) => props.findEmail(e, props.list._id, myMedia._id, myMedia.userMediaOutlet._id)} />
            )}
          </div>
        }
        {props.type === 'conference' &&
          <div className='col-12'>
            {props.items.map((myConference, index) =>
              <ConferenceItem {...myConference.userConference} conference={myConference.userConference.conference} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myConference._id, e)}
                openEmail={(e) => props.openEmail(myConference._id, e,myConference)}
                findEmail={(e) => props.findEmail(e, props.list._id, myConference._id, myConference.userConference._id)} />
            )}
          </div>
        }
        {props.type === 'guest' &&
          <div className='col-12'>
            {props.items.map((myGuest, index) =>
              <GuestItem {...myGuest.userGuest} key={index} index={index} {...props} handleSelected={props.handleSelected}
                myList={true} deleteContact={(e) => props.deleteItem(myGuest._id, e)}
                openEmail={(e) => props.openEmail(myGuest._id, e, myGuest)}
                findEmail={(e) => props.findEmail(e, props.list._id, myGuest._id, myGuest.userGuest._id)} />
            )}
          </div>
        }
        {props.count && props.pageSize > 0 &&
          <div className="row">
            <div className="col-12">
              <Paginate
                pageCount={Math.ceil(props.count[props.type] / props.pageSize)}
                handlePageClick={props.handlePageClick}
                forcePage={props.page}
              />
            </div>
          </div>
        }
      </React.Fragment>
    }
    {props.itemDetail &&
      <div className="row back-but-row">
        <div className="col-6 col-lg-2">
          <ActionButton
            buttonType={"secondary-action back-button"}
            onClick={props.backToResults}
            text={"Go Back to list"}
          />
        </div>
        {(props.type === 'podcast' || props.type === 'episode') &&
          <div className="col-12">
            <PodcastDetail {...props} />
          </div>
        }
        {props.type === 'eventOrganization' &&
          <div className="col-12">
            <EventOrganizationDetail eventDetail={props.itemDetail} {...props} />
          </div>
        }
        {props.type === 'business' &&
          <div className="col-12">
            <LocalBusinessDetail businessDetail={props.itemDetail} {...props} />
          </div>
        }
      </div>
    }
  </div>
);

export default MyListDetailPanel;
