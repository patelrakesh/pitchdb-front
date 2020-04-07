/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import ConferenceContact from './conference-contact';
import ListElements from '../../search-common/components/list-elements';
import SearchResultSelected from '../../search-common/components/search-results-selected';
import Chip from '@material-ui/core/Chip';
import { SocialIcon } from 'react-social-icons';
import '../../general/styles/search-results.css';
import './conference-item.css';

const UNKNOWN_EST_AUDIENCE = -1;

const ConferenceItem = props => (
  <div className={"ConferenceItem row search-item" + (props.conference.selected ? " result-selected" : "") + (props.staticItem ? " static-item" : "")
    + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={(!props.connected ? () => props.handleSelected(props.index) : () => { })}>
    {!props.staticItem &&
      <SearchResultSelected item={props.conference} connected={props.connected} />
    }
    <div className="col">
      <div className="row">
          <div className="eventInfo">
            <DisplayLabel
              textType={textTypes.DISPLAY_TITLE}
              text={props.conference.eventName} />
          
            <div className="description">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.conference.eventDescription} />
            </div>
          </div>
      <div className="container">
        <div className="contacts">
        <DisplayLabel
            textType={textTypes.DISPLAY_SUBTITLE}
            text={"Event"} />
        {props.conference.location &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Location:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={props.conference.location} />
          </div>
        }
        {props.conference.estAudience &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Est. Audience:" />
            </div>
            {props.conference.estAudience === UNKNOWN_EST_AUDIENCE ?
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text="Unknown" />
            :
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.conference.estAudience} />
            }
          </div>
        }
        {props.conference.date &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Date:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={`${new Intl.DateTimeFormat('en-US',{ month: 'long'}).format(new Date(props.conference.date))}, ${new Date(props.conference.date).getFullYear()}`} />
          </div>
        }
        {props.conference.category &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Category:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={props.conference.category} />
          </div>
        }
        {props.conference.website && props.connected &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Website:" />
            </div>
            <a href={"https://" + props.conference.website} target="_blank" rel="noopener noreferrer">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.conference.website} />
            </a>
          </div>
        }
        </div>
        <div className="company">
      <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Company" /> 
    <div className="company-info">
      <div className="logo">
      {props.conference.enrichment && props.conference.enrichment.logo ?
      
        <DisplayLabel
          textType={"label-image"}
          text={props.conference.enrichment.logo} />
      :
        <DisplayLabel
          textType={"label-image"}
          text={`https://logo.clearbit.com/${props.conference.website}`} />
      }
      </div>
      <div className="company">
      {/* {!props.conference.enrichment &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="No additional company info to display" />
      } */}
      {props.conference.enrichment && props.conference.enrichment.description &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.conference.enrichment.description} />
      }
      {props.conference.enrichment && props.conference.enrichment.foundedYear &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Since " />
            </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.conference.enrichment.foundedYear} />
            </div>   
      }
      {props.conference.enrichment && props.conference.enrichment.metrics && props.conference.enrichment.metrics.employeesRange &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Employees Range: " />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.conference.enrichment.metrics.employeesRange} />
            </div>
      }
      {props.conference.enrichment && props.conference.enrichment.category && props.conference.enrichment.category.sector &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Sector: " />
              </div>
  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.conference.enrichment.category.sector} />
            </div>
      }
      {props.conference.enrichment && props.conference.enrichment.category && props.conference.enrichment.category.industry &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Industry: " />
              </div>  
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.conference.enrichment.category.industry} />
            </div>
      }
      <div className="field">
        <div className="label">
        {props.conference.enrichment && props.conference.enrichment.facebook && props.conference.enrichment.facebook.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${props.conference.enrichment.facebook.handle}`}>
            <SocialIcon network="facebook" />
          </a>
        }
        </div>
        <div className="label">
        {props.conference.enrichment && props.conference.enrichment.linkedin && props.conference.enrichment.linkedin.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://linkedin.com/in/${props.conference.enrichment.linkedin.handle}`}>
            <SocialIcon network="linkedin" />
          </a>
        }
        </div>
        <div className="label">
        {props.conference.enrichment && props.conference.enrichment.crunchbase && props.conference.enrichment.crunchbase.handle &&
          <SocialIcon url={`https://crunchbase.com/${props.conference.enrichment.crunchbase.handle}`} />
        }
        </div>
      </div>
      </div>
    </div>
    <div className="tags">
    {props.conference.enrichment && props.conference.enrichment.tags && 
        props.conference.enrichment.tags.map((tag, index) => {

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
        <div className="actions">
          {!props.myList && !props.staticItem &&
            <ListElements
              lists={props.lists}
              onListChange={(l) => { props.onListChange(l, 'conference', props.conference); }}
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
            <ContactData hasEmail={props.inOutreachSeq ? true : props.conference.hasEmail} openEmail={props.openEmail} inOutreachSeq={props.inOutreachSeq}>
              <ConferenceContact conference={props.conference} />
            </ContactData>
          }
        </div>
      </div>
      </div>
    </div>
  </div >
);

export default ConferenceItem;