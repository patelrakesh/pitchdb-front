import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionButton, { buttonTypes } from '../../general/components/action-button';
import ActionIcon from '../../general/components/action-icon';
import InputBox from '../../general/components/input-box';
import './list-add-modal.css';
import '../../general/styles/add-to-lists-modal.css';

const ListAddModal = props => (
  <div className='ListAddModal conatiner-fluid'>
    <div className="row modal-header">
      <div className='col-12'>
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text={"Add to contact list"} />
      </div>
      <div className='col-12'>
        <div className="row">
          <div className="col-12 col-lg-8 add-text">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={"Choose the lists where you want to add the selected contacts"} />
          </div>
          {props.listCreateError && props.creationMode &&
            <div className="col-12 col-lg-8 add-text">
              <DisplayLabel
                textType={"display-normal display-error"}
                text={props.listCreateError} />
            </div>
          }
          <div className="col-12 col-lg-4">
            <ActionButton
              buttonType={buttonTypes.SECONDARY_ACTION}
              onClick={props.toggleListCreation}
              text={"+ Create list"}
            />
          </div>
        </div>
      </div>
    </div>
    {props.creationMode &&
      <div className="row modal-create-list">
        <div className="col-6 align-self-center">
          <InputBox
            box={true}
            type={"text"}
            name={"newListName"}
            onChange={props.handleInputChange}
            value={props.newListName}
            inputType={"create-podcast-list"}
            placeholder={"Name"}
          />
        </div>
        <div className="col-1 align-self-center">
          <ActionIcon
            dataId="list-add-modal-confirm"
            tooltip="Confirm"
            icon={"fas fa-check"}
            onClick={props.createList}
          />
        </div>
        <div className="col-1 align-self-center">
          <ActionIcon
            dataId="list-add-modal-cancel"
            tooltip="Cancel"
            icon={"fas fa-times"}
            className={"icon-negative"}
            onClick={props.toggleListCreation}
          />
        </div>
      </div>
    }
    <div className="col-12 modal-lists-panel">
      {props.lists.map((list, index) => {
        return (
          <div className={"row list-entry" + (list.selected ? " list-selected" : "")} key={index} index={index}
            onClick={() => props.handleListSelected(index)}>
            <div className="col-10">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={list.name} />
            </div>
          </div>
        );
      })}
    </div>
    <div className="row">
      <div className="offset-lg-4 col-4">
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={props.closeModal}
          text={"Cancel"}
        />
      </div>
      <div className="col-4">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={props.addItemToList}
          text={"Add"}
        />
      </div>
    </div>
  </div>
);

export default ListAddModal;

