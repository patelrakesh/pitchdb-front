import React from 'react';

import SearchItem from './search-item';
import Paginate from '../../../common/general/components/paginate';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './super-admin-searches-panel.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { AccountCircle } from '@material-ui/icons';

export default props =>
  <div className='SuperAdminSearchesPanel container-fluid content-padding'>
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
      <i className={"fas fa-search"}></i>
      Super Admin - Searches
      </div>
    </Breadcrumbs>
    </div>
    <div className="row">
      <div  id="searches-header" className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_CONTENT_TITLE}
          text="Super-Admin Searches"
        />
      </div>
    </div>
    <div className="row col-12">
      <DisplayLabel
        textType='display-title'
        text='Latests searches'
      />
    </div>

    {props.searches.map((search, index) =>
      <SearchItem key={index} search={search} />
    )}

    <div className="row">
      <div className="col-12">
        <Paginate
          pageCount={props.pageSize ? Math.ceil(props.searchesCount / props.pageSize) : 0}
          handlePageClick={props.handlePageClick}
          forcePage={props.page}
        />
      </div>
    </div>
  </div>;