import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import ListElements from '../../search-common/components/list-elements';
import defaultImg from '../../../resources/images/podcast-search/default-propsect-search.png';
import './podcast-item.css';
import '../../general/styles/search-results.css';
import LoadingIcon from '../../general/components/loading-icon';
import Rating from 'react-rating';
import commonDataParsing from '../../general/util/common-data-parsing';

const PodcastItem = props => (
  <div id={"p-" + props.podcast.iTunesId} className={"PodcastItem row search-item" + (props.podcast.selected ? " result-selected" : "") + (props.staticItem || (!props.myList && !props.podcast.done) ? " static-item" : "") +
    (props.podcast.failed ? " result-failed" : "") + ((props.myList && props.connected) ? " result-connected" : "")}
    onClick={((!props.connected && (props.myList || (props.podcast.done && !props.podcast.failed)))) ? () => props.handleSelected(props.index, 'podcast') : () => { }}>
    <div className="col-lg-2 d-none d-lg-flex align-self-center">
      <div className="row">
        {!props.staticItem && !props.connected ?
          <div className="col-2 result-check align-self-center">
            {!props.myList && !props.podcast.done && !props.podcast.failed &&
              < LoadingIcon />
            }
            {(props.myList || props.podcast.done) && props.podcast.selected &&
              <div><i className="fas fa-check-square"></i></div>
            }
            {(props.myList || props.podcast.done) && !props.podcast.selected &&
              <div><i className="far fa-square"></i></div>
            }
            {props.podcast.failed &&
              <div className="result-failed-icon"><i className="fas fa-times-circle"></i></div>
            }
          </div>
          :
          <div className='col-2'></div>
        }
        <div className="col-8 offset-lg-1 result-image">
          <DisplayLabel
            textType={"label-image"}
            text={props.podcast.image ? props.podcast.image : defaultImg}
            clickable={props.outreach || (!props.myList && !props.podcast.done) ? false : true}
            onClick={props.myList || props.podcast.done ? (e) => props.viewPodcastDetail(props.podcast.listenNotesId, e) :
              () => { }}
          />
        </div>
      </div>
    </div>
    <div className="col-12 d-lg-none d-block">
      <div className="row">
        {!props.staticItem && !props.connected ?
          <div className="col-1 result-check align-self-center">
            {!props.myList && !props.podcast.done && !props.podcast.failed &&
              < LoadingIcon />
            }
            {(props.myList || props.podcast.done) && props.podcast.selected &&
              <div><i className="fas fa-check-square"></i></div>
            }
            {(props.myList || props.podcast.done) && !props.podcast.selected &&
              <div><i className="far fa-square"></i></div>
            }
            {props.podcast.failed &&
              <div className="result-failed-icon"><i className="fas fa-times-circle"></i></div>
            }
          </div>
          :
          <div className='col-2'></div>
        }
        <div className="col-4 result-image align-self-center">
          <DisplayLabel
            textType={"label-image"}
            text={props.podcast.image ? props.podcast.image : defaultImg}
            clickable={props.outreach || (!props.myList && !props.podcast.done) ? false : true}
            onClick={props.myList || props.podcast.done ? (e) => props.viewPodcastDetail(props.podcast.listenNotesId, e) :
              () => { }}
          />
        </div>
        <div className="col-6 align-self-center">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUBTITLE}
            text={commonDataParsing.trimTitle(props.podcast.title, 50)}
            clickable={props.outreach || (!props.myList && !props.podcast.done) ? false : true}
            onClick={props.myList || props.podcast.done ? (e) => props.viewPodcastDetail(props.podcast.listenNotesId, e) :
              () => { }} />

        </div>
      </div>
    </div>
    <div className="col-12 col-lg-10">
      <div className="row podcast-content">
        <div className="col-lg-4 col-12">
          <div className="col-12 d-none d-lg-flex">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUBTITLE}
              text={commonDataParsing.trimTitle(props.podcast.title, 50)}
              clickable={props.outreach || (!props.myList && !props.podcast.done) ? false : true}
              onClick={props.myList || props.podcast.done ? (e) => props.viewPodcastDetail(props.podcast.listenNotesId, e) :
                () => { }} />
          </div>
          <div className="col-lg-12 by-podcast-item">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={"By " + commonDataParsing.trimTitle(props.podcast.publisherName, 40)} />
          </div>
          <div className="col-12 align-self-center rating-section">
            <div className="row">
              <div className="col-auto align-self-center">
                <Rating
                  emptySymbol="far fa-star"
                  fullSymbol="fas fa-star"
                  fractions={2}
                  initialRating={props.podcast.rating !== -1 ? props.podcast.rating : 0}
                  readonly={true}
                />
              </div>
              <div className="col-auto align-self-center">
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={props.podcast.ratingsAmount > 0 ? props.podcast.ratingsAmount + " rating(s)" :
                    "No ratings"} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-12 podcast-item-desc">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={commonDataParsing.trimDescription(props.podcast.description, 350)} />
        </div>
      </div>
      <div className="row tags-row">
        {props.podcast.genres.map((genre, index) =>
          <div className="tag-cont col-auto" key={index} index={index}>
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={commonDataParsing.trimTitle(genre.label, 15)} />
          </div>
        )}
      </div>
      {(props.myList || props.inOutreachSeq) && props.connected &&
        <ContactData isPodcast={true} hasEmail={props.podcast.hasEmail} openEmail={props.openEmail} inOutreachSeq={props.inOutreachSeq} />
      }
    </div>
    {!props.myList && !props.staticItem &&
      <ListElements
        lists={props.lists}
        onListChange={(l) => { props.onListChange(l, 'podcast', props.podcast); }}
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
  </div >
);

export default PodcastItem;
