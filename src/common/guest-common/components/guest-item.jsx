import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import ListElements from '../../search-common/components/list-elements';
import './guest-item.css';
import commonDataParsing from '../../general/util/common-data-parsing';
import '../../general/styles/search-results.css';
import defaultImg from '../../../resources/images/people-search/default-guest-search.png';
import SearchResultsSelected from '../../search-common/components/search-results-selected';


const GuestItem = props => (
  <div className={"GuestItem row search-item" + (props.guest.selected ? " result-selected" : "") + (props.staticItem ? " static-item" : "")
    + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={(!props.connected ? () => props.handleSelected(props.index, 'guest') : () => { })}>
    {!props.myList && !props.staticItem &&
      <ListElements
        lists={props.lists}
        onListChange={(l) => { props.onListChange(l, 'guest', props.guest); }}
      />
    }
    {props.myList &&
      <ContactElements
        date={props.date}
        key={props.key}
        deleteContact={props.deleteContact}
        connected={props.connected}
        findEmail={props.findEmail}
        isPodcastOrPeople={true}
      />
    }
    <div className="col-lg-2 align-self-center">
      <div className="row">
        {!props.staticItem &&
          <SearchResultsSelected item={props.guest} connected={props.connected} />
        }
        <div className="col-8 result-image-guest">
          <DisplayLabel
            textType={"label-image"}
            text={props.guest.image ? props.guest.image : defaultImg} />
        </div>
      </div>
    </div>
    <div className="col-12 col-lg-10">
      <div className="row">
        <div className="col-12">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUBTITLE}
            text={props.guest.name ? props.guest.name : props.guest.fullName} />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-11 contact-fields">
              <div className="col-12">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={commonDataParsing.parseGuestJob(props.guest.jobTitle)} />
              </div>
              {props.guest.company &&
                <div className="col-12">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={(props.guest.jobTitle ? "at " : "") + props.guest.company} />
                </div>
              }
            </div>
          </div>
        </div>
        {(props.myList || props.inOutreachSeq) && props.connected &&
          <ContactData hasEmail={props.guest.hasEmail} openEmail={props.openEmail} />
        }
      </div>
    </div>
  </div>
);

export default GuestItem;
