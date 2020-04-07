/* eslint-disable linebreak-style */
import React from 'react';
import MyListDetailItem from './my-list-detail-item';
import InputBox from '../../../common/general/components/input-box';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import ConfirmCancelIcons from '../../../common/general/components/confirm-cancel-icons';
import Paginate from '../../../common/general/components/paginate';
import './my-lists-panel.css';
import Divider from '@material-ui/core/Divider';


const MyListsPanel = props => (
  <div className="MyListsPanel col content-padding">
    <div className="row">
    <div className="col content-title-cont">
      <DisplayLabel
        textType={textTypes.DISPLAY_CONTENT_TITLE}
        text="Contact Lists"
      />
      <Divider className="divider"/>
    </div>
    </div>
    <div className="row">
      <div className="col-lg-2 col-6 offset-3 offset-lg-1 create-list">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={props.toggleCreationMode}
          text={"+ Create"}
        />
      </div>
    </div>
    {props.creationMode &&
      <div className="row new-list">
        <div className="d-flex col-lg-5 col-12 offset-0 offset-lg-1 align-self-center">
          <InputBox
            box={true}
            type={"text"}
            name={"newListName"}
            onChange={props.handleInputChange}
            value={props.newListName}
            inputType={"create-podcast-list"}
            placeholder={"Name"}
          />
          <ConfirmCancelIcons
            confirmAction={props.createList}
            cancelAction={props.cancelCreation}
          />
        </div>
      </div>
    }
    {(props.lists && props.lists.length > 0) ?
      <div id="lists-list" className="row lists-container">
        <div className="col offset-0 offset-lg-1">
          {props.lists.map((list, index) => (
            <MyListDetailItem list={list} key={index} index={index} {...props} />
          ))}
        </div>
      </div>
      :
      <div className="row">
        <div className="col col-lg-8 offset-0 offset-lg-1 lists-container">
          <DisplayLabel
            textType={"label-no-search"}
            text={"You don't have any lists yet"} />
        </div>
      </div>}
    <div className="row">
      <div className="col-12 col-lg-8 offset-0 offset-lg-1">
        <Paginate
          pageCount={Math.ceil(props.listsAmount / props.pageSize)}
          handlePageClick={props.handlePageClick}
          forcePage={props.page}
        />
      </div>
    </div>
  </div>
);

export default MyListsPanel;
