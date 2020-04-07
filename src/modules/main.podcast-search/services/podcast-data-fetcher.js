import axios from 'axios';
import async from 'async';

import FeedParser from 'feedparser';
import request from 'request';

import podcastSocketApi from '../../../api/sockets/podcasts-api';

const ITUNES_BASE_URL = "https://itunes.apple.com/";
const ITUNES_RATING_URL = "https://itunes.apple.com/us/rss/customerreviews/id=";

export default {
  fetchItunesReviewsData: ({ podcast, socket, index }, callback) => {
    async.waterfall([
      async.apply(fetchItunesData, podcast),
      fetchReviewsData
    ], (err, iTunesData, reviewsData) => {
      socket.emit(podcastSocketApi.events.ITUNES_DATA, {
        index: index,
        podcastData: iTunesData,
        reviewsData: reviewsData
      });
      //console.log(iTunesData, reviewsData);
      callback();
    });
  }
};

const fetchItunesData = (podcast, next) => {
  axios.get(ITUNES_BASE_URL + "/lookup?id=" + podcast.iTunesId)
    .then(response => {
      const elements = response.data.results;
      let iTunesData = elements[0];
      next(null, podcast, iTunesData);
    })
    .catch(err => {
      //console.log(err);
      next(null, podcast, null);
    });
};

const fetchReviewsData = (podcast, iTunesData, next) => {
  getFeed(ITUNES_RATING_URL + podcast.iTunesId + "/xml", (err, result) => {
    if (err) next(null, iTunesData);
    else {
      next(null, iTunesData, result);
    }
  });
};

const getFeed = (urlfeed, callback) => {
  let req = request(urlfeed, { timeout: 4000 });
  let feedparser = new FeedParser();
  let feedItems = new Array();
  req.on("response", response => {
    let stream = req;
    if (response.statusCode == 200) {
      stream.pipe(feedparser);
    }
  });
  req.on("error", err => {
    callback(err);
  });
  feedparser.on("readable", () => {
    try {
      let item = feedparser.read();
      if (item !== null) {
        feedItems.push(item);
      }
    }
    catch (err) {
      //console.log(err);
    }
  });
  feedparser.on("end", () => {
    callback(null, feedItems);
  });
  feedparser.on("error", err => {
    callback(err);
  });
};
