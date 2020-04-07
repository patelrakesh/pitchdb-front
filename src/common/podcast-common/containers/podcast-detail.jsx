import React, { Component } from 'react';
import PodcastDetailPanel from '../components/podcast-detail-panel';
import podcastsApi from '../../../api/routes/podcasts-api';
import async from 'async';

class PodcastDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      reviews: [],
      episodes: [],
      showingReviews: false,

      reviewsPage: 0,
      episodesPage: 0,

      totalReviews: 0,
      totalEpisodes: 0,

      pageSizeReviews: 0,
      pageSizeEpisodes: 0
    };

    this.functions = {
      getUserReviews: this.getUserReviews,
      closeReviews: this.closeReviews,
      toggleUserReviews: this.toggleUserReviews,
      handleEpisodesPageClick: this.handleEpisodesPageClick,
      handleReviewsPageClick: this.handleReviewsPageClick,
      playEpisodeAudio: this.playEpisodeAudio
    };
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    async.parallel([
      callback => this.getEpisodesInitial(callback),
      callback => this.getEpisodesCount(callback),
      callback => this.getReviewsCount(callback),
    ], (err) => {
      if (err) this.props.finishLoading(true,'An error occured while loading the podcast data');
      else this.props.changeLoadingMessage();
    });
  }

  getEpisodesCount = callback => {
    podcastsApi.getEpisodesCount(this.props.itemDetail._id)
      .then(response => {
        this.setState({
          totalEpisodes: response.data.count,
          pageSizeEpisodes: response.data.pageSize
        }, () => callback());
      })
      .catch(error => { callback(error); });
  }

  getReviewsCount = callback => {
    podcastsApi.getReviewsCount(this.props.itemDetail._id)
      .then(response => {
        this.setState({
          totalReviews: response.data.count,
          pageSizeReviews: response.data.pageSize
        }, () => callback());
      })
      .catch(error => callback(error));
  }

  toggleUserReviews = () => {
    this.setState({
      showingReviews: !this.state.showingReviews
    }, () => {
      if (this.state.showingReviews)
        this.getReviews(this.state.reviewsPage);
    });
  }

  getEpisodesInitial = (callback) => {
    podcastsApi.getEpisodesById(this.props.itemDetail._id, 0)
      .then(response => {
        this.setState({ episodes: response.data }, () => callback());
      })
      .catch((error) => callback(error));
  }

  getEpisodes = (page = 0) => {
    this.props.changeLoadingMessage("Loading episodes");
    podcastsApi.getEpisodesById(this.props.itemDetail._id, page)
      .then(response => {
        this.setState({ episodes: response.data, episodesPage: page }, () => {
          window.scrollTo({
            top: window.document.getElementById('episodes-list').offsetTop + 250
          });
          this.props.changeLoadingMessage();
        });
      })
      .catch(() => this.props.finishLoading(true,'There was an error loading the podcast episodes'));
  }

  getReviews = (page = 0) => {
    this.props.changeLoadingMessage("Loading reviews");
    podcastsApi.getReviewsById(this.props.itemDetail._id, page)
      .then(response => {
        this.setState({ reviews: response.data, reviewsPage: page }, () => {
          this.props.changeLoadingMessage();
        });
      })
      .catch(() => this.props.finishLoading(true,'There was an error loading the podcast reviews'));
  }

  handleEpisodesPageClick = (data) => {
    this.getEpisodes(data.selected);
  }

  handleReviewsPageClick = (data) => {
    this.getReviews(data.selected);
  }

  closeReviews = () => { this.setState({ showingReviews: false }); }

  playEpisodeAudio = episode => {
    this.props.setPodcastPlayerData({
      audioSrc: episode.enclosure.url,
      podcastTitle: this.props.itemDetail.title,
      episodeTitle: episode.title
    });
  }

  render = () => <PodcastDetailPanel {...this.state} {...this.props} {...this.functions} />
}

export default PodcastDetail;
