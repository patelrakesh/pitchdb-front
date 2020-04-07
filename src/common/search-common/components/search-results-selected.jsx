import React from 'react';

export default props => (
  <>
    {!props.connected ?
      <div className="col-1 align-self-center result-check item-checkbox">
        {props.item.selected ?
          <div><i className="fas fa-check-square"></i></div>
          :
          <div><i className="far fa-square"></i></div>}
      </div>
      :
      <div className="col-1"></div>
    }
  </>
);