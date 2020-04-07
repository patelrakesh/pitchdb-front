import React from 'react';
import ReviewItem from './review-item';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import ActionIcon from '../../general/components/action-icon';
import Paginate from '../../general/components/paginate';
import './reviews-panel.css';

const ReviewsPanel = props =>
  <div className="ReviewsPanel container-fluid">
    <div id="reviews-list" className="row">
      <div className="col-10 col-lg-11">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUBTITLE}
          text={"Reviews for this podcast (" + props.totalReviews + ")"}
        />
      </div>
      <div className="col-2 col-lg-1">
        <ActionIcon
          icon="fas fa-times"
          className={"icon-negative"}
          onClick={props.closeReviews}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        {props.reviews.map((review, index) =>
          <div className="row" key={index} index={index}>
            <ReviewItem review={review} />
          </div>
        )}
      </div>
      <div className="col-12">
        <Paginate
          pageCount={Math.ceil(props.totalReviews / props.pageSizeReviews)}
          handlePageClick={props.handleReviewsPageClick}
          forcePage={props.reviewsPage}
        />
      </div>
    </div>
  </div>;

export default ReviewsPanel;