/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionButton from '../../general/components/action-button';
import ContactElements from '../../list-common/components/contact-elements';
import ListElements from '../../search-common/components/list-elements';
import ContactData from '../../list-common/components/contact-data';
import LocalBusinessContact from './local-business-contact';
import changeCase from 'change-case';
import Chip from '@material-ui/core/Chip';
import { SocialIcon } from 'react-social-icons';
import './local-business-item.css';
import '../../general/styles/search-results.css';

const enrichmentEnabled = false;

const LocalBusinessItem = ({ openEmail, business, myList, peopleSearch, viewItemDetail, boldTitle, date, key, deleteContact, connected,
  inOutreachSeq, findEmail, onListChange, lists, staticItem }) => (
    <>
    <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={business.companyName} />
    
    <div className="container">
      <div className="contact">
        <DisplayLabel
                textType={textTypes.DISPLAY_SUBTITLE}
                text="Contact" />
        {business.position &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Position:" />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={changeCase.titleCase(business.position)} />
            </div>
          }
          {business.city && business.state &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Location:" />
              </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={changeCase.titleCase(business.city) + ", " + business.state} />
            </div>
          }
      </div>
      <div className="company">
          <DisplayLabel
              textType={textTypes.DISPLAY_SUBTITLE}
              text="Company" />
      <div className="company-info">
        <div className="logo">
          {business.enrichment ?
          
            <DisplayLabel
              textType={"label-image"}
              text={business.enrichment.logo} />
          :
            <DisplayLabel
              textType={"label-image"}
              text={`https://logo.clearbit.com/${business.website}`} />
          }
        </div>
      <div className="company">
      {/* {!enrichmentEnabled && business.enrichment &&
          <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="No additional company info to display" />
        } */}
      {enrichmentEnabled && business.enrichment && business.enrichment.description &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={business.enrichment.description} />
      }
      {enrichmentEnabled && business.enrichment && business.enrichment.foundedYear &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Since " />
            </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={business.enrichment.foundedYear} />
            </div>   
      }
      {business.enrichment && business.enrichment.metrics && business.enrichment.metrics.employeesRange &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Employees Range: " />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={business.enrichment.metrics.employeesRange} />
            </div>
      }
      {business.enrichment && business.enrichment.category && business.enrichment.category.sector &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Sector: " />
              </div>
  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={business.enrichment.category.sector} />
            </div>
      }
      {business.enrichment && business.enrichment.category && business.enrichment.category.industry &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Industry: " />
              </div>  
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={business.enrichment.category.industry} />
            </div>
      }
      <div className="field">
        <div className="label">
        {business.enrichment && business.enrichment.facebook && business.enrichment.facebook.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${business.enrichment.facebook.handle}`}>
            <SocialIcon network="facebook" />
          </a>
        }
        </div>
        <div className="label">
        {business.enrichment && business.enrichment.linkedin && business.enrichment.linkedin.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://linkedin.com/in/${business.enrichment.linkedin.handle}`}>
            <SocialIcon network="linkedin" />
          </a>
        }
        </div>
        <div className="label">
        {business.enrichment && business.enrichment.crunchbase && business.enrichment.crunchbase.handle &&
          <SocialIcon url={`https://crunchbase.com/${business.enrichment.crunchbase.handle}`} />
        }
        </div>
          </div>
          </div>
        </div>
        <div className="tags">
        {enrichmentEnabled && business.enrichment && business.enrichment.tags && 
            business.enrichment.tags.map((tag, index) => {
            return (
              <div key={index} className="chip">
                <Chip
                  key={index}
                  label={tag}
                  color="primary"
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="actions row">
        {!myList && !staticItem &&
          <ListElements
            lists={lists}
            onListChange={(l) => { onListChange(l, 'business', business); }}
            isBusinessList={true}
          />
        }
        {myList &&
          <ContactElements
            date={date}
            key={key}
            deleteContact={deleteContact}
            connected={connected}
            findEmail={findEmail}
          />
        }
        {peopleSearch &&
        <div>
          <ActionButton
            buttonType='secondary-action'
            onClick={(e) => viewItemDetail(business, e)}
            text='Search for people who work here'
          />
        </div>
      }
      {((myList && connected) || inOutreachSeq) &&
        <ContactData hasEmail={inOutreachSeq ? true : business.hasEmail} openEmail={openEmail} inOutreachSeq={inOutreachSeq}>
          <LocalBusinessContact business={business} />
        </ContactData>
      }
      </div>
    </div>
    </>
);

export default LocalBusinessItem;
