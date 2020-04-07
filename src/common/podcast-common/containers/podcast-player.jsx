import React, { Component } from 'react';
import PodcastPlayerComponent from '../components/podcast-player';

class PodcastPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playerMinimized: false,
      audioError: false,
      audioLoading: true
    };

    this.functions = {
      togglePlayer: this.togglePlayer,
      closePlayer: this.closePlayer,
      onError: this.onError,
      onCanPlay: this.onCanPlay
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.episodeTitle !== this.props.episodeTitle) {
      this.setState({
        audioError: false,
        audioLoading: true
      });
    }
  }

  togglePlayer = () => {
    this.setState({ playerMinimized: !this.state.playerMinimized });
  }

  closePlayer = () => {
    this.setState({ playerMinimized: false },
      () => {
        this.props.setPodcastPlayerData(null);
      });
  }

  onError = () => {
    this.setState({ audioError: true });
  }

  onCanPlay = () => {
    this.setState({
      audioError: false,
      audioLoading: false
    });
  }

  render = () =>
    <PodcastPlayerComponent {...this.props} {...this.state} {...this.functions} />
}

export default PodcastPlayer;