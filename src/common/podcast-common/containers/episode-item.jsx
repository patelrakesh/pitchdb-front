import React, { Component } from 'react';
import EpisodeItemComponent from '../components/episode-item';

class EpisodeItem extends Component {
  constructor (props) {
    super(props);
    this.state = {};

    this.functions = {
      playEpisodeAudio: this.playEpisodeAudio
    };
  }

  playEpisodeAudio = (e) => {
    e.stopPropagation();
    this.props.setPodcastPlayerData({
      audioSrc: this.props.episode.audio,
      podcastTitle: this.props.episode.podcastTitle,
      episodeTitle: this.props.episode.title
    });
  }

  render = () =>
    <EpisodeItemComponent {...this.props} {...this.state} {...this.functions} />
}

export default EpisodeItem;