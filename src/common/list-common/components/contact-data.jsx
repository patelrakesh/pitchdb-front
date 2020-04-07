import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionButton, { buttonTypes } from '../../general/components/action-button';
import './contact-data.css';

const ContactData = ({ children, openEmail, hasEmail, inOutreachSeq, isPodcast }) =>
  <>
    <div className="contact-data-title col-12">
      <DisplayLabel
        text="Contact information"
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
      />
          {children}
    </div>

    {!inOutreachSeq &&
      <div className="col-8 col-lg-3 send-action">
        {hasEmail ?
          <ActionButton
            buttonType={buttonTypes.SECONDARY_ACTION}
            onClick={openEmail}
            text={"Send Email"}
          />
          :
          <>
            <i className={"fas fa-exclamation-triangle no-email-warning"}></i> 
            <span> {isPodcast ? "We apologize, it appears this podcast may no longer be in production" : "No email" } </span>
          </>
        }
      </div>
    }
  </>;

export default ContactData;
