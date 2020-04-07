/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ListElements from '../../search-common/components/list-elements';
import ContactData from '../../list-common/components/contact-data';
import NationalBusinessContact from './national-business-contact';
import changeCase from 'change-case';
import Chip from '@material-ui/core/Chip';
import { SocialIcon } from 'react-social-icons';
import '../../general/styles/search-results.css';
import './national-business-item.css';

const enrichmentEnabled = false;

const NationalBusinessItem = props => (
  <>
  <DisplayLabel
    textType={textTypes.DISPLAY_TITLE}
    text={props.business.organization} />
  <div className="national-business-container">
    <div className="national-contacts">
    <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Contact" />
    <div className="national-contact-info">
    {props.business.firstName &&
      <div className="national-field">
        <div className="national-label">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Name:" />
        </div>

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={`${props.business.firstName ? props.business.firstName : ''} ${props.business.middleName ? props.business.middleName : ''} ${props.business.lastName ? props.business.lastName : ''}`} />
      </div>
    }
    {props.business.position &&
      <div className="national-field">
        <div className="national-label">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Position:" />
        </div>

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={changeCase.titleCase(props.business.position)} />
      </div>
    }
    {props.business.city && props.business.state &&
      <div className="national-field">
        <div className="national-label">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text="Location:" />
        </div>

        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={changeCase.titleCase(props.business.city) + ", " + props.business.state} />
      </div>
    }    
    </div>
    </div>
    <div className="national-company">
      <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Company" /> 
    <div className="national-company-info">
      <div className="national-logo">
      {props.business.enrichment ?
      
        <DisplayLabel
          textType={"label-image"}
          text={props.business.enrichment.logo} />
      :
        <DisplayLabel
          textType={"label-image"}
          text={`https://logo.clearbit.com/${props.business.website}`} />
      }
      </div>
      <div className="national-company">
      {/* {!enrichmentEnabled && props.business.enrichment &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="No additional company info to display" />
      } */}
      {enrichmentEnabled && props.business.enrichment && props.business.enrichment.description &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.business.enrichment.description} />
      }
      {enrichmentEnabled && props.business.enrichment && props.business.enrichment.foundedYear &&
            <div className="national-field">
              <div className="national-label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Since " />
            </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.business.enrichment.foundedYear} />
            </div>   
      }
      {props.business.enrichment && props.business.enrichment.metrics && props.business.enrichment.metrics.employeesRange &&
            <div className="national-field">
              <div className="national-label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Employees Range: " />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.business.enrichment.metrics.employeesRange} />
            </div>
      }
      {props.business.enrichment && props.business.enrichment.category && props.business.enrichment.category.sector &&
            <div className="national-field">
              <div className="national-label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Sector: " />
              </div>
  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.business.enrichment.category.sector} />
            </div>
      }
      {props.business.enrichment && props.business.enrichment.category && props.business.enrichment.category.industry &&
            <div className="national-field">
              <div className="national-label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Industry: " />
              </div>  
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.business.enrichment.category.industry} />
            </div>
      }
      <div className="national-field">
        <div className="national-label">
        {props.business.enrichment && props.business.enrichment.facebook && props.business.enrichment.facebook.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${props.business.enrichment.facebook.handle}`}>
            <SocialIcon network="facebook" />
          </a>
        }
        </div>
        <div className="national-label">
        {props.business.enrichment && props.business.enrichment.linkedin && props.business.enrichment.linkedin.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://linkedin.com/in/${props.business.enrichment.linkedin.handle}`}>
            <SocialIcon network="linkedin" />
          </a>
        }
        </div>
        <div className="national-label">
        {props.business.enrichment && props.business.enrichment.crunchbase && props.business.enrichment.crunchbase.handle &&
          <SocialIcon label="crunchbase" url={`https://crunchbase.com/${props.business.enrichment.crunchbase.handle}`}/>
        }
        </div>
      </div>
      </div>
    </div>
    <div className="national-tags">
    {enrichmentEnabled && props.business.enrichment && props.business.enrichment.tags && 
        props.business.enrichment.tags.map((tag, index) => {

        return (
          <div key={index} className="national-chip">
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
    <div className="national-actions row">
    {!props.myList && !props.staticItem &&
      <ListElements
        lists={props.lists}
        onListChange={(l) => { props.onListChange(l, 'business', props.business); }}
        isBusinessList={true}
      />
    }

    {props.myList &&
      <ContactElements
        date={props.date}
        key={props.key}
        deleteContact={props.deleteContact}
        connected={props.connected}
        findEmail={props.findEmail}
      />
    }
    {((props.myList && props.connected) || props.inOutreachSeq) &&
      <ContactData hasEmail={props.inOutreachSeq ? true : props.business.hasEmail} openEmail={props.openEmail} inOutreachSeq={props.inOutreachSeq}>
        <NationalBusinessContact business={props.business} />
      </ContactData>
    }
    </div>
  </div>
  </>
);

export default NationalBusinessItem;
