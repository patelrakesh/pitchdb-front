import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ContactElements from '../../list-common/components/contact-elements';
import ContactData from '../../list-common/components/contact-data';
import ListElements from '../../search-common/components/list-elements';
import defaultImg from '../../../resources/images/podcast-search/default-propsect-search.png';
import commonDataParsing from '../../general/util/common-data-parsing';
import ActionIcon from '../../general/components/action-icon';
import LoadingIcon from '../../general/components/loading-icon';
import './episode-item.css';
import '../../general/styles/search-results.css';

const EpisodeItem = ({ episode, index, handleSelected, myList, staticItem,
  outreach, viewPodcastDetail, playEpisodeAudio, date, key, deleteContact, openEmail, onListChange, connected, findEmail, lists, inOutreachSeq }) => (
    <div id={"p-" + episode.iTunesId} className={"EpisodeItem row search-item" + (episode.selected ? " result-selected" : "") + (staticItem || (!myList && !episode.done) ? " static-item" : "") +
      (episode.failed ? " result-failed" : "") + ((myList && connected) ? " result-connected" : "")}
      onClick={((!connected && (myList || (episode.done && !episode.failed)))) ? () => handleSelected(index, 'episode') : () => { }}>      
      <div className="col-lg-2 d-none d-lg-flex align-self-center">
        <div className="row">
          {!staticItem && !connected ?
            <div className="col-2 result-check align-self-center">
              {!myList && !episode.done && !episode.failed &&
                < LoadingIcon />
              }
              {(myList || episode.done) && episode.selected &&
                <div><i className="fas fa-check-square"></i></div>
              }
              {(myList || episode.done) && !episode.selected &&
                <div><i className="far fa-square"></i></div>
              }
              {episode.failed &&
                <div className="result-failed-icon"><i className="fas fa-times-circle"></i></div>
              }
            </div>
            :
            <div className='col-2'></div>
          }
          <div className="col-8 offset-lg-1 result-image">
            <DisplayLabel
              textType={"label-image"}
              text={episode.image ? episode.image : defaultImg}
              clickable={outreach || (!myList && !episode.done) ? false : true}
              onClick={myList || episode.done ? (e) => viewPodcastDetail(episode.podcastListenNotesId, e) :
                () => { }}
            />
          </div>
        </div>
      </div>
      <div className="col-12 d-lg-none d-block">
        <div className="row">
          {!staticItem && !connected ?
            <div className="col-1 result-check align-self-center">
              {!myList && !episode.done && !episode.failed &&
                < LoadingIcon />
              }
              {(myList || episode.done) && episode.selected &&
                <div><i className="fas fa-check-square"></i></div>
              }
              {(myList || episode.done) && !episode.selected &&
                <div><i className="far fa-square"></i></div>
              }
              {episode.failed &&
                <div className="result-failed-icon"><i className="fas fa-times-circle"></i></div>
              }
            </div>
            :
            <div className='col-2'></div>
          }
          <div className="col-4 result-image align-self-center">
            <DisplayLabel
              textType={"label-image"}
              text={episode.image ? episode.image : defaultImg}
              clickable={outreach || (!myList && !episode.done) ? false : true}
              onClick={(myList || episode.done) ? (e) => viewPodcastDetail(episode.podcastListenNotesId, e) :
                () => { }} />
          </div>
          <div className="col-6 align-self-center">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUBTITLE}
              text={commonDataParsing.trimTitle(episode.title, 70)}
              clickable={outreach || (!myList && !episode.done) ? false : true}
              onClick={myList || episode.done ? (e) => viewPodcastDetail(episode.podcastListenNotesId, e) :
                () => { }}
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-10">
        <div className="row episode-content">
          <div className="col-lg-4 col-12">
            <div className="col-12 d-none d-lg-flex">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUBTITLE}
                text={commonDataParsing.trimTitle(episode.title, 70)}
                clickable={outreach || (!myList && !episode.done) ? false : true}
                onClick={myList || episode.done ? (e) => viewPodcastDetail(episode.podcastListenNotesId, e) :
                  () => { }}
              />
            </div>
            <div className="col-lg-12 by-podcast-item">
              <DisplayLabel
                textType={textTypes.DISPLAY_SUB_SUBTITLE}
                text={commonDataParsing.trimTitle(episode.podcastTitle, 50)}
                clickable={outreach || (!myList && !episode.done) ? false : true}
                onClick={myList || episode.done ? (e) => viewPodcastDetail(episode.podcastListenNotesId, e) :
                  () => { }} />
            </div>
            <div className="col-lg-12 by-podcast-item">
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={"By " + commonDataParsing.trimTitle(episode.publisherName, 40)} />
            </div>
          </div>
          <div className="col-lg-8 col-12 episode-item-desc">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={"(" + commonDataParsing.parseDate(episode.publishDate) + ") " + commonDataParsing.trimDescription(episode.description, 350)} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex align-items-center play-item-col">
            {episode.audio ?
              <>
                <ActionIcon
                  dataId={`i-${index}`}
                  tooltip="Play episode"
                  icon={"fas fa-play-circle"}
                  className={"icon-play-podcast"}
                  onClick={(e) => playEpisodeAudio(e)}
                />
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={episode.duration} />
              </>
              :
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={"No audio available"} />
            }
          </div>

        </div>
        <div className="row tags-row">
          {episode.genres.map((genre, index) =>
            <div className="tag-cont" key={index} index={index}>
              <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={commonDataParsing.trimTitle(genre.label, 15)} />
            </div>
          )}
        </div>
        {(myList || inOutreachSeq) && connected &&
          <ContactData isPodcast={true} hasEmail={episode.hasEmail} openEmail={openEmail} />
        }
      </div>
      {myList && !staticItem &&
        <ContactElements
          date={date}
          key={key}
          deleteContact={deleteContact}
          connected={connected}
          findEmail={findEmail}
          isPodcastOrPeople={true}
        />
      }
      {!myList &&
        <ListElements
          lists={lists}
          onListChange={(l) => { onListChange(l, 'episode', episode); }}
        />
      }
    </div>
  );

export default EpisodeItem;
