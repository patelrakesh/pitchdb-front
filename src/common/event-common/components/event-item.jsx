/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import SearchResultSelected from '../../search-common/components/search-results-selected';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import ListElements from '../../search-common/components/list-elements';
import EventContact from './event-contact';
import constants from '../constants';
import Chip from '@material-ui/core/Chip';
import { SocialIcon } from 'react-social-icons';
import './event-item.css';
import '../../general/styles/search-results.css';

const enrichmentEnabled = false;

const EventItem = props => (
  <div className={"EventItem row search-item" + (props.event.selected ? " result-selected" : "") + (props.staticItem ? " static-item" : "")
    + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={(!props.connected ? () => props.handleSelected(props.index, 'eventOrganization') : () => { })}>
    {!props.staticItem &&
      <SearchResultSelected item={props.event} connected={props.connected} />
    }
    <div className="col-11">
     
          <DisplayLabel
            textType={textTypes.DISPLAY_TITLE}
            text={props.event.dataFileType === constants.TYPE_PRINCIPAL ?
              props.event.schoolName
              :
              props.event.organization} />
        
        <div className="container">
          <div className="contacts">
          <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Events" />
            <div className="contact-info">
        {props.event.city && props.event.state &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Location:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={(props.event.dataFileType === constants.TYPE_EVENT_PLANNER ? props.event.country + " - " : "")
                + props.event.city + ", " + props.event.state} />
          </div>
        }
        {props.event.budget &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Budget:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={"$" + props.event.budget} />
          </div>
        }
        {props.event.position &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Position:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={props.event.position} />
          </div>
        }
        {props.event.places && props.event.places.length > 0 &&
          <div className="field-tags">
            <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Places:" />
              </div>
              
                <div className="tags">
                  {props.event.places.map((place, index) => {
                    return (<div className="tag-cont" key={index} index={index}>
                      <DisplayLabel
                        textType={textTypes.DISPLAY_NORMAL}
                        text={place} />
                    </div>);
                  })
                  }
                </div>
              
            </div>
          }
        {props.event.months && props.event.months.length > 0 &&
          <div className="field-tags">
            <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Months:" />
              </div>
              
                <div className="tags">
                  {props.event.months.map((month, index) => {
                    return (<div className="tag-cont" key={index} index={index}>
                      <DisplayLabel
                        textType={textTypes.DISPLAY_NORMAL}
                        text={month} />
                    </div>);
                  })
                  }
                </div>
              
            </div>
          }
        {props.event.locations && props.event.locations.length > 0 &&
          
            <div className="field-tags">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Areas:" />
              </div>
              
                <div className="tags">
                  {props.event.locations.map((location, index) => {
                    return (<div className="tag-cont" key={index} index={index}>
                      <DisplayLabel
                        textType={textTypes.DISPLAY_NORMAL}
                        text={location} />
                    </div>);
                  })
                  }
                </div>
              
            </div>
          }
        {props.event.schoolTypes && props.event.schoolTypes.length > 0 &&
          <div className="field-tags">
            <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Education:" />
              </div>
              
                <div className="tags">
                  {props.event.schoolTypes.map((schoolType, index) => {
                    return (<div className="tag-cont" key={index} index={index}>
                      <DisplayLabel
                        textType={textTypes.DISPLAY_NORMAL}
                        text={schoolType} />
                    </div>);
                  })
                  }
                </div>
              
            </div>
          }
          </div>
          </div>
          <div className="company">
        {/* Commented out while clearbit api issue is resolved */}
      {/* <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Company" />  */}
    <div className="company-info">
      <div className="logo">                         
      {props.event.enrichment ?
      
        <DisplayLabel
          textType={"label-image"}
          text={props.event.enrichment.logo} />
      :
        <DisplayLabel
          textType={"label-image"}
          text={`https://logo.clearbit.com/${props.event.website}`} />
      }
      </div>
      <div className="company">
      {/* {!enrichmentEnabled && props.event.enrichment &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="No additional company info to display" />
      } */}
      {enrichmentEnabled && props.event.enrichment && props.event.enrichment.description &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.event.enrichment.description} />
      }
      {enrichmentEnabled && props.event.enrichment && props.event.enrichment.foundedYear &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Since " />
            </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.event.enrichment.foundedYear} />
            </div>   
      }
      {props.event.enrichment && props.event.enrichment.metrics && props.event.enrichment.metrics.employeesRange &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Employees Range: " />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.event.enrichment.metrics.employeesRange} />
            </div>
      }
      {props.event.enrichment && props.event.enrichment.category && props.event.enrichment.category.sector &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Sector: " />
              </div>
  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.event.enrichment.category.sector} />
            </div>
      }
      {props.event.enrichment && props.event.enrichment.category && props.event.enrichment.category.industry &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Industry: " />
              </div>  
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.event.enrichment.category.industry} />
            </div>
      }
      <div className="field">
        <div className="label">
        {props.event.enrichment && props.event.enrichment.facebook && props.event.enrichment.facebook.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${props.event.enrichment.facebook.handle}`}>
            <SocialIcon network="facebook" />
          </a>
        }
        </div>
        <div className="label">
        {props.event.enrichment && props.event.enrichment.linkedin && props.event.enrichment.linkedin.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://linkedin.com/in/${props.event.enrichment.linkedin.handle}`}>
            <SocialIcon network="linkedin" />
          </a>
        }
        </div>
        <div className="label">
        {props.event.enrichment && props.event.enrichment.crunchbase && props.event.enrichment.crunchbase.handle &&
          <SocialIcon url={`https://crunchbase.com/${props.event.enrichment.crunchbase.handle}`} />
        }
        </div>
      </div>
      </div>
    </div>
    <div className="tags">
    {enrichmentEnabled && props.event.enrichment && props.event.enrichment.tags && 
        props.event.enrichment.tags.map((tag, index) => {

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
        {!props.myList && !props.staticItem &&
          <ListElements
            lists={props.lists}
            onListChange={(l) => { props.onListChange(l, 'eventOrganization', props.event); }}
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
          <ContactData hasEmail={props.inOutreachSeq ? true : props.event.hasEmail} openEmail={props.openEmail} inOutreachSeq={props.inOutreachSeq}>
            <EventContact event={props.event} />
          </ContactData>
        }
        </div>
      </div>
      </div>
    
  </div>
);

export default EventItem;
