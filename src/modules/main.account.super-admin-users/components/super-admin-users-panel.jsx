/* eslint-disable linebreak-style */
import React from 'react';
import UserItem from './user-item';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import ActionIcon from '../../../common/general/components/action-icon';
import InputBox from '../../../common/general/components/input-box';
import Paginate from '../../../common/general/components/paginate';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './super-admin-users-panel.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';

const SuperAdminPanel = props => (
  <div className="SuperAdminPanel container-fluid content-padding">
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
      <i className={"fas fa-users-cog "}></i>
      Super Admin - Users
      </div>
    </Breadcrumbs>
    </div>
    <div className="row">
      <div id="list-top" className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Super-Admin Users"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-8 col-lg-3">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={props.enterCreationMode}
          text={"+ Create user account"}
        />
      </div>
      <div className="col-8 offset-0 offset-lg-6 col-lg-3">
        <a href="https://app.pitchdb.com:3002" target="_blank" rel="noopener noreferrer">
          Manage PitchDB data <i className="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
    <div className="row user-search-row">
      <div className="col-lg-6 col-10 align-self-center">
        <InputBox
          box={true}
          type={"text"}
          name={"term"}
          onChange={props.handleInputChange}
          value={props.term}
          placeholder={"Search by name or email"}
        />
      </div>
      <div className="col-2 ">
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={props.searchUsers}
          text={"Search"}
        />
      </div>
    </div>
    {props.creationMode &&
      <div className="row new-user">
        <div className="col-lg-4 col-12 align-self-center">
          <InputBox
            box={true}
            type={"email"}
            name={"newUserEmail"}
            onChange={props.handleInputChange}
            value={props.newUserEmail}
            inputType={"create-podcast-list"}
            placeholder={"someone@email.com"}
          />
        </div>
        <div className="col-lg-4 col-12 align-self-center">
          <InputBox
            box={true}
            type={"text"}
            name={"newUserName"}
            onChange={props.handleInputChange}
            value={props.newUserName}
            inputType={"create-podcast-list"}
            placeholder={"Name"}
          />
        </div>
        <div className="offset-8 offset-lg-0 col-2 col-lg-1 align-self-center confirm-icon">
          <ActionIcon
            dataId="super-admin-users-panel-confirm"
            tooltip="Confirm"
            icon={"fas fa-check"}
            onClick={props.createUser}
          />
        </div>
        <div className="col-2 col-lg-1 align-self-center confirm-icon">
          <ActionIcon
            dataId="super-admin-users-panel-cancel"
            tooltip="Cancel"
            icon={"fas fa-times"}
            className={"icon-negative"}
            onClick={props.closeCreationMode}
          />
        </div>
      </div>
    }
    {props.users.map((currentUser, index) =>
      <UserItem
        index={index}
        key={index}
        currentUser={currentUser}
        {...props}
      />
    )}
    <div className="row.col-12">
      <Paginate
        pageCount={Math.ceil(props.usersAmount / props.pageSize)}
        handlePageClick={props.handlePageClick}
        forcePage={props.page}
      />
    </div>
  </div>
);

export default SuperAdminPanel;