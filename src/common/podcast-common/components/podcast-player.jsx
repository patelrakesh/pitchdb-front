import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionIcon from '../../general/components/action-icon';
import commonDataParsing from '../../general/util/common-data-parsing';
import LoadingIcon from '../../general/components/loading-icon';
import './podcast-player.css';

export default ({ audioSrc, podcastTitle, episodeTitle, closePlayer,
  togglePlayer, playerMinimized, onError, audioError,
  audioLoading, onCanPlay }) =>
  <div className="PodcastPlayer align-items-center">
    <ActionIcon
      dataId="i-close-player"
      tooltip="Close player"
      containerClass="player-close-icon"
      icon={"fas fa-times"}
      className="icon-negative"
      onClick={closePlayer}
    />
    <ActionIcon
      dataId="i-toggle-player"
      tooltip="Minimize/Maximize"
      containerClass="player-toggle-icon"
      icon={playerMinimized ? "fas fa-chevron-up" : "fas fa-chevron-down"}
      onClick={togglePlayer}
    />
    <div className='player-podcast-data'>
      {!playerMinimized &&
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.trimTitle(podcastTitle, 70)}
        />
      }
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text={commonDataParsing.trimTitle(episodeTitle, 70)}
      />
    </div>
    {!audioError &&
      <div className="d-flex align-items-center">
        <ReactAudioPlayer
          src={audioSrc}
          controls={!playerMinimized}
          className='podcast-audio-player'
          autoPlay={true}
          onError={onError}
          onCanPlay={onCanPlay}
        />
        {audioLoading &&
          <LoadingIcon />
        }
      </div>
    }
    {audioError &&
      <DisplayLabel
        textType='display-error player-error-msg'
        text="Could not load episode audio"
      />
    }
  </div>;