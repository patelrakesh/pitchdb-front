import React from 'react';
import commonDataParsing from '../../general/util/common-data-parsing';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import './item-date.css';

const ItemDate = ({ date }) =>
  <div className="col-12 ItemDate">
    <DisplayLabel
      text={`Added on ${commonDataParsing.parseDate(date)}`}
      textType={`${textTypes.DISPLAY_NORMAL} color-tertiary`}
    />
  </div>;

export default ItemDate;
