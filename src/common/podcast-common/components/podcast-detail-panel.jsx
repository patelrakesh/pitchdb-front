import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import defaultImg from '../../../resources/images/podcast-search/default-propsect-search.png';
import EpisodeDetail from './episode-detail';
import ActionIcon from '../../general/components/action-icon';
import Rating from 'react-rating';
import Modal from 'react-aria-modal';
import ReviewsPanel from './reviews-panel';
import commonDataParsing from '../../general/util/common-data-parsing';
import Paginate from '../../general/components/paginate';
import '../../general/styles/search-results.css';
import './podcast-detail-panel.css';

const PodcastDetailPanel = props => (
  <div id="podcast-detail" className={"PodcastDetailPanel col"}>
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={commonDataParsing.trimTitle(props.itemDetail.title, 70)} />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-2 col-6 detail-img">
        <DisplayLabel
          textType={"label-image"}
          text={props.itemDetail.image ? props.itemDetail.image : defaultImg} />
      </div>
      <div className="col-lg-10 col-6 align-self-center">
        <div className="row">
          <div className="col-12 align-self-center">
            <DisplayLabel
              textType={textTypes.DISPLAY_SUBTITLE}
              text={"By " + commonDataParsing.trimTitle(props.itemDetail.publisherName, 50)} />
          </div>
          <div className="col-12 d-none d-lg-block">
            <DisplayLabel
              textType={textTypes.DISPLAY_NORMAL}
              text={commonDataParsing.trimDescription(props.itemDetail.description, 500)} />
          </div>
        </div>
      </div>
    </div>
    <div className="row rating-detail-section">
      <div className="col-auto align-self-center">
        <Rating
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          fractions={2}
          initialRating={props.itemDetail.rating !== -1 ? props.itemDetail.rating : 0}
          readonly={true}
        />
      </div>
      <div className="col-auto align-self-center">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.itemDetail.ratingsAmount > 0 ? props.itemDetail.ratingsAmount + " rating(s)" :
            "No ratings"} />
      </div>
      <div className="col-12 offset-lg-1 offset-0 col-lg-3 ">
        <div className="row">
          <div className="col-auto">
            <ActionIcon
              icon="fas fa-comments"
              onClick={props.toggleUserReviews}
            />
          </div>
          <div className="col-auto" onClick={props.toggleUserReviews}>
            <DisplayLabel
              textType={"display-normal color-main clickable-text"}
              text={"Click to Read Reviews"} />
          </div>
        </div>
      </div>
      {props.showingReviews &&
        <Modal
          titleId={"podcast-detail-reviews"}
          verticallyCenter={true}
          focusDialog={true}>
          <ReviewsPanel {...props} />
        </Modal>}
    </div>
    <div className="row d-lg-none d-block">
      <div className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.trimDescription(props.itemDetail.description, 500)} />
      </div>
    </div>
    <div className="row detail-tags podcast-tags-row">
      {props.itemDetail.genres.map((genre, index) =>
        <div className="tag-cont col-auto" key={index} index={index}>
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={commonDataParsing.trimTitle(genre.label, 25)} />
        </div>
      )}
    </div>
    <div className="row">
      <div className="col-lg-12">
        <div id="episodes-list" className="col-lg-12 episodes-header">
          <DisplayLabel
            textType={"list-item-value display-subtitle"}
            text={"Episodes (" + props.totalEpisodes + ")"} />
        </div>
        <div className="col-12 episodes-list">
          {props.episodes.map((episode, index) =>
            <EpisodeDetail episode={episode} key={index} index={index} playEpisodeAudio={props.playEpisodeAudio} />
          )}
        </div>
        <div className="col-12">
          <Paginate
            pageCount={Math.ceil(props.totalEpisodes / props.pageSizeEpisodes)}
            handlePageClick={props.handleEpisodesPageClick}
            forcePage={props.episodesPage}
          />
        </div>
      </div>
    </div>
  </div>
);

export default PodcastDetailPanel;
