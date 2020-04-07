import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import InputBox from "../../../common/general/components/input-box";
import LoadingIcon from '../../../common/general/components/loading-icon';
import './stage-category-header.css';

const StageCategoryHeader = props => (
  <div className="StageCategoryHeader row">
    <div className="col-10">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUBTITLE}
        text={props.categoryName} />
    </div>
    <div className="col-1">
      <LoadingIcon
        hidden={!props.loadingVisible}
      />
    </div>
    <div className="col-12">
      <InputBox
        box={true}
        placeholder={"Filter by term"}
        name={"termf"}
        onChange={props.changeFilterTerm}
        value={props.termf}
      />
    </div>
  </div>
);

export default StageCategoryHeader;
