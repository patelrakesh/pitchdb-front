/* eslint-disable linebreak-style */
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import StageCategoryHeader from './stage-category-header';
import Stage from '../containers/stage';
import commonDataParsing from '../../../common/general/util/common-data-parsing';

import './stage-category-panel.css';

const StageCategoryPanel = props => (
  <div className="StageCategoryPanel container-fluid">
    <StageCategoryHeader
      categoryName={props.categoryName}
      changeFilterTerm={props.changeFilterTerm}
      loadingVisible={props["update" + commonDataParsing.toTitleCase(props.category)]} />
    <div className="col-12">

      {props.items.map((stage, index) =>
        <Stage stage={stage} key={index} index={index} {...props} />
      )}
    </div>
    {props.category === 'waiting' &&
      <div className="row add-more-sequences">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          clickable={true}
          text={"+ Create a sequence from your lists"}
          onClick={() => props.changePage('my-lists')} />
      </div>}
  </div>
);

export default StageCategoryPanel;
