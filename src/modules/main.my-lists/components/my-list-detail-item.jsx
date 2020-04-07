import React from 'react';
import InputBox from '../../../common/general/components/input-box';
import ActionIcon from '../../../common/general/components/action-icon';
import ConfirmCancelIcons from '../../../common/general/components/confirm-cancel-icons';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import './my-list-detail-item.css';

const MyListDetailItem = props => (
  <div className="MyListDetailItem row">
    <div className="col-lg-4">
      <div className="row">
        <div className="col-12 d-flex align-items-center list-name">
          {props.editionModeIndex !== props.index ?
            <React.Fragment>
              <DisplayLabel
                clickable={!props.list.empty}
                textType={textTypes.DISPLAY_SUBTITLE}
                onClick={() => props.viewListPodcasts(props.list._id)}
                text={props.list.name} />
              <ActionIcon
                dataId="my-list-detail-item-change"
                tooltip="Change name"
                iconType={"standard-action"}
                onClick={() => props.setEditList(props.index)}
                icon={"fas fa-pen"}
              />
            </React.Fragment>
            :
            <React.Fragment>
              <InputBox
                box={true}
                type={"text"}
                name={"editListName"}
                onChange={props.handleInputChange}
                value={props.editListName}
                inputType={"create-podcast-list"}
                placeholder={"Name"}
              />
              <ConfirmCancelIcons
                confirmAction={() => props.editList(props.index)}
                cancelAction={props.cancelEdition}
              />
            </React.Fragment>
          }
        </div>
        <div className="col-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"Created" +
              // (props.user.teamId && props.user.role === 'admin' ? " by " +
              //   (props.list.userId._id === props.user._id ? "me" : props.list.userId.name) + " " : "") +
              " on " + commonDataParsing.parseDate(props.list.dateCreated)} />
        </div>
      </div>
    </div>
    <div className="list-counts">
      {!props.list.empty ?
        <div className="row">
          {props.list.count.podcast > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.podcast + " podcast(s)"} />
            </div>
          }
          {props.list.count.episode > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.episode + " episode(s)"} />
            </div>
          }
          {props.list.count.eventOrganization > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.eventOrganization + " event planner(s)"} />
            </div>
          }
          {props.list.count.business > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.business + " business(es)"} />
            </div>
          }
          {props.list.count.mediaOutlet > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.mediaOutlet + " media outlet(s)"} />
            </div>
          }
          {props.list.count.conference > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.conference + " conference(s)"} />
            </div>
          }
          {props.list.count.guest > 0 &&
            <div className="col-lg-12 col-4">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.list.count.guest + " people"} />
            </div>
          }
        </div>
        :
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"No contacts on this list"} />
      }
    </div>
    <div className="col-lg-auto col-12 d-flex justify-content-end justify-content-lg-start align-items-center">
      <ActionIcon
        dataId="my-list-detail-item-delete"
        tooltip="Delete list"
        iconType={"standard-action"}
        onClick={() => props.deleteList(props.index)}
        icon={"fas fa-trash"}
      />
    </div>
  </div>
);

export default MyListDetailItem;
