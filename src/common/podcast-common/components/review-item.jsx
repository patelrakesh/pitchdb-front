import React from 'react';
import Rating from 'react-rating';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import commonDataPArsing from '../../general/util/common-data-parsing';
import './review-item.css';

const ReviewItem = props => (
  <div className="ReviewItem col-12">
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={props.review.author} />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-lg-3">
        <Rating
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          fractions={2}
          initialRating={props.review.rating}
          readonly={true}
        />
      </div>
      <div className="col-8">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={props.review.title} />
      </div>
      <div className="col-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"(" + commonDataPArsing.parseDate(props.review.date) + ")"} />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.review.comment} />
      </div>
    </div>
  </div>
);

export default ReviewItem;