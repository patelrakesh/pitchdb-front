import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import './coming-soon-page.css';

const ComingSoonPage = props => (
  <div className="ComingSoonPage container-fluid">
    <div className="row">
      <div className="col-12 coming-soon">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={props.comingSoonText} />
      </div>
    </div>
  </div>
);

export default ComingSoonPage;