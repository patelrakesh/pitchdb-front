/* eslint-disable linebreak-style */
import React from 'react';
import NavigationItem from './navigation-item';
import ReactTooltip from 'react-tooltip';
import './navigation-panel.css';

const navigationOptions = [
  {
    option: "dashboard",
    title: "Dashboard",
    icon: "fa-home"
  },
  {
    option: "podcast-search",
    title: "Podcasts",
    icon: "fa-podcast"
  },
  {
    option: "live-events",
    title: "Event Planners",
    icon: "fa-calendar-alt"
  },
  {
    option: "media-search",
    title: "Media Outlets",
    icon: "fa-newspaper"
  },
  {
    option: "conference-search",
    title: "Conferences",
    icon: "fa-microphone-alt"
  },
  {
    option: "business-search",
    title: "Businesses",
    icon: "fa-briefcase"
  },
  {
    option: "people-search",
    title: "People",
    icon: "fa-user-tie"
  },
  {
    option: "my-lists",
    title: "Contacts Lists",
    icon: "fa-list"
  },
  {
    option: "outreach-sequences",
    title: "Mailbox",
    icon: "fa-envelope"
  },
  {
    option: "reports",
    title: "Reports",
    icon: "fa-chart-bar"
  }
];

const NavigationPanel = props => (
  <div className={"NavigationPanel container-fluid" + (props.minimizedNavigation ? " minimized-navigation" : " maximized-navigation")
    + (props.history.location.pathname.startsWith("/main/payment/credits") ? " invisible-navigation" : "")}>
    <div className="row menu-expander">
      <div className="col" onClick={props.toggleMenu}>
        <span data-tip data-for="show-hide-nav" className="span-minimize">
          <i className="fas fa-bars"></i>
        </span>
        <ReactTooltip id="show-hide-nav" place="right" type="dark" effect="solid" border={true} delayShow={300}>
          <span>{(props.minimizedNavigation ? "Maximize " : "Minimize ") + "navigation menu"}</span>
        </ReactTooltip>
      </div>
    </div>
    {navigationOptions.map(({ icon, option, title }, index) => (
      (option === "business-search" || option === "people-search") ?
        (props.user.privileges.includes("superAdmin") || props.user.privileges.includes("betaUser")) ?
          <NavigationItem
            minimizedNavigation={props.minimizedNavigation}
            isActive={props.history.location.pathname.startsWith(`/main/${option}`)}
            text={title}
            icon={icon}
            dataId={option}
            onClick={() => props.changePage(option)}
            link={`main/${option}`}
            key={index}
          />
        :
        <span></span>
      :
      <NavigationItem
        minimizedNavigation={props.minimizedNavigation}
        isActive={props.history.location.pathname.startsWith(`/main/${option}`)}
        text={title}
        icon={icon}
        dataId={option}
        onClick={() => props.changePage(option)}
        link={`main/${option}`}
        key={index}
      />
    ))}
  </div>
);

export default NavigationPanel;
