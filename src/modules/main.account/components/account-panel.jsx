/* eslint-disable linebreak-style */
import React from 'react';
import Team from '../../main.account.team/containers/team';
import Configuration from '../../main.account.configuration/containers/configuration';
import SuperAdminUsers from '../../main.account.super-admin-users/containers/super-admin-users';
import SuperAdminSearches from '../../main.account.super-admin-searches/containers/super-admin-searches';
import { Route } from 'react-router-dom';
import AccountItem from './account-item';
import './account-panel.css';

const AccountPanel = props => (
  <div className="AccountPanel container-fluid">
    <div className="row">
      <div className="col-lg-2 d-none d-lg-block account-navigation">
        <AccountItem
          onClick={() => props.changePage("account/configuration")}
          pathName="configuration"
          realPath={props.history.location.pathname}
          text="Configuration"
          icon="fas fa-cog"
        />
        <AccountItem
          onClick={() => props.changePage("account/team")}
          pathName="team"
          realPath={props.history.location.pathname}
          text="Team"
          icon="fas fa-users"
        />
        {props.user.privileges.includes("superAdmin") &&
          <AccountItem
            onClick={() => props.changePage("account/super-admin-users")}
            pathName="super-admin-users"
            realPath={props.history.location.pathname}
            text="Super Admin - Users"
            icon="fas fa-user-cog"
          />
        }
        {props.user.privileges.includes("superAdmin") &&
          <AccountItem
            onClick={() => props.changePage("account/super-admin-searches")}
            pathName="super-admin-searches"
            realPath={props.history.location.pathname}
            text="Super Admin - Searches"
            icon="fas fa-search"
          />
        }
      </div>
      <div className="col-lg-10 col-12 d-lg-block">
        <Route exact path={'/main/account/configuration'}
          render={() => (<Configuration {...props} />)} />
        <Route exact path={'/main/account/team'}
          render={() => (<Team {...props} />)} />
        {props.user.privileges.includes("superAdmin") &&
          <Route exact path={'/main/account/super-admin-users'}
            render={() => (<SuperAdminUsers {...props} />)} />
        }
        {props.user.privileges.includes("superAdmin") &&
          <Route exact path={'/main/account/super-admin-searches'}
            render={() => (<SuperAdminSearches {...props} />)} />
        }
      </div>
    </div>
  </div >
);

export default AccountPanel;
