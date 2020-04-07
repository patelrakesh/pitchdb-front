/* eslint-disable linebreak-style */
import React from 'react';
import Header from '../containers/header';
// import ExtensionPrompt from '../components/extension-prompt';
import Footer from '../containers/footer';
import { Route } from 'react-router-dom';
import NavigationPanel from './navigation-panel';

import Dashboard from '../../main.dashboard/containers/dashboard';
import PodcastSearch from '../../main.podcast-search/containers/podcast-search';
import LiveEvents from '../../main.live-events/containers/live-events';
import BusinessSearch from '../../main.business-search/containers/business-search';
import PeopleSearch from '../../main.people-search/containers/people-search';
import MediaSearch from '../../main.media-search/containers/media-search';
import MyLists from '../../main.my-lists/containers/my-lists';
import MyListItems from '../../main.my-lists/containers/my-list-items';
import OutreachSequences from '../../main.outreach-sequences/containers/outreach-sequences';
import Reports from '../../main.reports/container/reports';
import Account from '../../main.account/containers/account';
import CreditsPayment from '../../main.credits/containers/credits-payment';
import ConferenceSearch from '../../main.conference-search/containers/conference-search';

import ComingSoonPage from '../../../common/general/components/coming-soon-page';
import PodcastPlayer from '../../../common/podcast-common/containers/podcast-player';
import Overlay from '../../../common/general/components/overlay';

import './main-panel.css';

const MainPanel = props => (
  <div className="MainPanel container-fluid">
    {props.user &&
      <React.Fragment>
        <Header {...props} />
        {/* {props.showChromeExtension &&
          <ExtensionPrompt dismissExtensionPrompt={props.dismissExtensionPrompt} />
        } */}
        <NavigationPanel {...props} />
        <div className={"main-content row" + (props.minimizedNavigation ? " minimized-main" : "") +
          (props.history.location.pathname.startsWith("/main/payment/credits") ? " invisible-main" : "") +
          (props.history.location.pathname.startsWith("/main/outreach-sequences") ? " main-full-width" : "")} >
          {/* Dashboard */}
          <Route exact path={'/main/dashboard'}
            render={() => (<Dashboard {...props} />)} />
          {/* Podcast finder */}
          <Route exact path={'/main/podcast-search'}
            render={() => (<PodcastSearch {...props} />)} />
          {/* Event Planners */}
          <Route exact path={'/main/live-events'}
            render={() => (<LiveEvents {...props} />)} />
          {/* Business finder */}
          <Route exact path={'/main/business-search'}
              render={() => (<BusinessSearch {...props} />)} />
          {/* People Search */}
          <Route exact path={'/main/people-search'}
              render={() => (<PeopleSearch {...props} />)} />
          {/* Media Search */}
          <Route exact path={'/main/media-search'}
            render={() => (<MediaSearch {...props} />)} />
          {/* Conference Search */}
          <Route exact path={'/main/conference-search'}
            render={() => (<ConferenceSearch {...props} />)} />
          {/* My lists */}
          <Route exact path={'/main/my-lists'}
            render={() => (<MyLists {...props} />)} />
          <Route exact path={'/main/my-lists/:id'}
            render={() => (<MyListItems {...props} />)} />
          {/* Outreach sequences */}
          <Route exact path={'/main/outreach-sequences/'}
            render={() => (<OutreachSequences {...props} />)} />
          {/* Account */}
          <Route path={'/main/account'}
            render={() => (<Account {...props} />)} />
          {/* Payment */}
          <Route path={'/main/payment/credits'}
            render={() => (<CreditsPayment {...props} />)} />
          {/* Reports */}
          <Route exact path={'/main/reports'}
            render={() => (<Reports {...props} />)} />
          {props.loadingMessage &&
            <Overlay
              message={props.loadingMessage}
            />
          }
        </div>
        {props.podcastPlayerData &&
          <PodcastPlayer
            {...props.podcastPlayerData}
            setPodcastPlayerData={props.setPodcastPlayerData}
          />
        }
        <Footer {...props} />
      </React.Fragment >}
  </div>
);

export default MainPanel;
