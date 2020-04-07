/* eslint-disable linebreak-style */
import React from 'react';
import commonDataParsing from '../../general/util/common-data-parsing';
import ActionButton, { buttonTypes } from '../../general/components/action-button';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionIcon from '../../general/components/action-icon';
import './contact-elements.css';

const ContactElements = ({ date, index, deleteContact, findEmail, connected, isPodcastOrPeople }) =>
  <>
    <div className="col-12 align-self-center ContactElements">
      <DisplayLabel
        text={`Added on ${commonDataParsing.parseDate(date)}`}
        textType={`${textTypes.DISPLAY_NORMAL} color-tertiary`}
      />
      <ActionIcon
        dataId={`i-delete-${index}`}
        tooltip="Delete contact"
        icon={"fas fa-trash"}
        onClick={deleteContact}
      />
    </div>
    {!connected &&
      <div className={(isPodcastOrPeople ? "offset-lg-9 offset-2": "") + " col-8 col-lg-3 find-action"}>
        <ActionButton
          buttonType={buttonTypes.SECONDARY_ACTION}
          onClick={findEmail}
          text={"Get Email"}
        />
      </div>
    }
  </>;

export default ContactElements;
