import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import SocialAuthButton from '../../../common/general/components/social-auth-button';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import networkConstants from '../../../common/general/constants/networks';
import './email-configuration-panel.css';

const EmailConfigurationPanel = props => (
  <div className="EmailConfigurationPanel col-12">
    <div className="row explain-email">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Email"} />
      </div>
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Set up the email accounts you will use in your outreach sequences."} />
      </div>
    </div>
    {props.emailAccounts.length > 0 &&
      <div className="row current-email">
        <div className="col-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUBTITLE}
            text={"Connected accounts:"} />
        </div>
        {props.emailAccounts.map((account, index) =>
          <div className="col-12 email-account-entry" key={index}>
            <div className="row">
              <div className="col-9 col-sm-6 col-md-4">
                {account.email ?
                  <DisplayLabel
                    textType={index === 0 ? textTypes.DISPLAY_SUB_SUBTITLE : textTypes.DISPLAY_NORMAL}
                    text={account.email} />
                  :
                  <DisplayLabel
                    textType={index === 0 ? textTypes.DISPLAY_SUB_SUBTITLE : textTypes.DISPLAY_NORMAL}
                    text={'Gmail account'} />
                }

              </div>
              {index === 0 ?
                <div className="col-12 col-sm">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUB_SUBTITLE}
                    text={"(Primary)"} />
                </div>
                :
                <div className="col-12 col-sm">
                  <DisplayLabel
                    clickable={true}
                    onClick={() => props.setPrimaryAccount(account._id)}
                    textType={"display-normal color-clickable"}
                    text={"(Set as primary)"} />
                </div>
              }
              {account.date &&
                <div className="col-12">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={"Connected on " + commonDataParsing.parseDate(account.date)} />
                </div>
              }
            </div>
          </div>
        )}
      </div>
    }
    <div className="row email-acc-row">
      <div className="col-12 connect-button email-sign-in">
        <SocialAuthButton
          socialSite={networkConstants.GOOGLE}
          onClick={() => props.configureAccount(networkConstants.GMAIL)}
        />
      </div>
      <div className="col-12 connect-button email-sign-in">
        <SocialAuthButton
          socialSite={networkConstants.MICROSOFT}
          onClick={() => props.configureAccount(networkConstants.OUTLOOK)}
        />
      </div>
    </div>
  </div>
);

export default EmailConfigurationPanel;
