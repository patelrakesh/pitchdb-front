import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import commonDataParsing from '../../general/util/common-data-parsing';
import ActionIcon from '../../general/components/action-icon';
import podcastDataFormatter from '../util/podcast-data-formatter';
import './episode-detail.css';
import '../../general/styles/search-results.css';

const EpisodeDetail = ({ episode, index, playEpisodeAudio }) => (
  <div className={"EpisodeDetail container-fluid"}>
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={episode.title} />
      </div>
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"Published on: " + commonDataParsing.parseDate(episode.publishDate)} />
      </div>
      <div className="col-12 episode-desc-cont">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.trimDescription(episode.description, 500)} />
      </div>
      <div className="col-12 d-flex align-items-center">
        {episode.enclosure ?
          <>
            <ActionIcon
              dataId={`i-${index}`}
              tooltip="Play episode"
              icon={"fas fa-play-circle"}
              className={"icon-play-podcast"}
              onClick={() => playEpisodeAudio(episode)}
            />
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={podcastDataFormatter.formatDuration(episode.duration)} />
          </>
          :
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={"No audio available"} />
        }
      </div>

    </div>
    <div className="row episode-tags-row">
      {episode.keywords.map((keyword, index) =>
        <div className="col-auto tag-cont" key={index} index={index}>
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={keyword} />
        </div>
      )}
    </div>
  </div >
);

export default EpisodeDetail;
