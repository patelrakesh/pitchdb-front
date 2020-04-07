/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import MediaContact from './media-contact';
import ListElements from '../../search-common/components/list-elements';
import changeCase from 'change-case';
import SearchResultSelected from '../../search-common/components/search-results-selected';
import Chip from '@material-ui/core/Chip';
import { SocialIcon } from 'react-social-icons';
import '../../general/styles/search-results.css';
import './media-item.css';

const enrichmentEnabled = false;

const MediaItem = props => (
  <div className={"MediaItem row search-item" + (props.media.selected ? " result-selected" : "") + (props.staticItem ? " static-item" : "")
    + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={(!props.connected ? () => props.handleSelected(props.index) : () => { })}>
    {!props.staticItem &&
      <SearchResultSelected item={props.media} connected={props.connected} />
    }
    <div className="col-11">
      
        <div className="media-item-title">
          <DisplayLabel
            textType={textTypes.DISPLAY_TITLE}
            text={props.media.companyName} />
          {props.media.magazineGenre &&
            <DisplayLabel
              textType={`${textTypes.DISPLAY_NORMAL} mag-genre`}
              text={`(${props.media.magazineGenre})`} />
          }
          </div>
      <div className="container">
        <div className="contacts">
        <div className="field">
          <div className="label">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUB_SUBTITLE}
              text="Position:" />
          </div>
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={changeCase.titleCase(props.media.position)} />
        </div>
        {props.media.city && props.media.state &&
          <div className="field">
            <div className="label">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text="Location:" />
            </div>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={changeCase.titleCase(props.media.city) + ", " + props.media.state} />
          </div>
        }
        <div className="field">
          <DisplayLabel
            textType={`${textTypes.DISPLAY_NORMA} color-tertiary italic`}
            text={props.media.person ? 'Employee contact' : 'Generic company contact'} />
        </div>
        </div>
        <div className="company">
        {/* Commented out while clearbit api issue is resolved */}
      {/* <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="Company" />  */}
    <div className="company-info">
      <div className="logo">
      {props.media.enrichment ?
      
        <DisplayLabel
          textType={"label-image"}
          text={props.media.enrichment.logo} />
      :
        <DisplayLabel
          textType={"label-image"}
          text={`https://logo.clearbit.com/${props.media.website}`} />
      }
      </div>
      <div className="company">
      {/* {!enrichmentEnabled && props.media.enrichment &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text="No additional company info to display" />
      } */}
      {enrichmentEnabled && props.media.enrichment && props.media.enrichment.description &&
        
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.media.enrichment.description} />
      }
      {enrichmentEnabled && props.media.enrichment && props.media.enrichment.foundedYear &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Since " />
            </div>  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.media.enrichment.foundedYear} />
            </div>   
      }
      {props.media.enrichment && props.media.enrichment.metrics && props.media.enrichment.metrics.employeesRange &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Employees Range: " />
              </div>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.media.enrichment.metrics.employeesRange} />
            </div>
      }
      {props.media.enrichment && props.media.enrichment.category && props.media.enrichment.category.sector &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Sector: " />
              </div>
  
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.media.enrichment.category.sector} />
            </div>
      }
      {props.media.enrichment && props.media.enrichment.category && props.media.enrichment.category.industry &&
            <div className="field">
              <div className="label">
                <DisplayLabel
                  textType={textTypes.DISPLAY_SUB_SUBTITLE}
                  text="Industry: " />
              </div>  
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.media.enrichment.category.industry} />
            </div>
      }
      <div className="field">
        <div className="label">
        {props.media.enrichment && props.media.enrichment.facebook && props.media.enrichment.facebook.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${props.media.enrichment.facebook.handle}`}>
            <SocialIcon network="facebook" />
          </a>
        }
        </div>
        <div className="label">
        {props.media.enrichment && props.media.enrichment.linkedin && props.media.enrichment.linkedin.handle &&
          <a target="_blank" rel="noopener noreferrer" href={`https://linkedin.com/in/${props.media.enrichment.linkedin.handle}`}>
            <SocialIcon network="linkedin" />
          </a>
        }
        </div>
        <div className="label">
        {props.media.enrichment && props.media.enrichment.crunchbase && props.media.enrichment.crunchbase.handle &&
          <SocialIcon url={`https://crunchbase.com/${props.media.enrichment.crunchbase.handle}`} />
        }
        </div>
      </div>
      </div>
    </div>
    <div className="tags">
    {enrichmentEnabled && props.media.enrichment && props.media.enrichment.tags && 
        props.media.enrichment.tags.map((tag, index) => {

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
              onListChange={(l) => { props.onListChange(l, 'mediaOutlet', props.media); }}
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
            <ContactData hasEmail={props.inOutreachSeq ? true : props.mediaOutlet.hasEmail} openEmail={props.openEmail} inOutreachSeq={props.inOutreachSeq}>
              <MediaContact media={props.media} />
            </ContactData>
          }
        </div>
      </div>
      </div>
    
  </div >
);

export default MediaItem;