import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import banner from '../../../resources/images/pitchdb/pitch-db-blue.png';
import Authentication from '../containers/authentication';
import ForgotPassword from '../containers/forgot-password';
import './home-panel.css';

let HomePanel = props => (
  <div className="HomePanel container">
    <div className="row">
      <div className="col-12 banner-image">
        <DisplayLabel
          textType={textTypes.LABEL_IMAGE}
          text={banner} />
      </div>
    </div>
    <div className="row buttons-cont">
      {!props.forgetPasswordVisible ?
        <Authentication {...props} />
        :
        <ForgotPassword {...props} />
      }
    </div>
  </div>
);

export default HomePanel;
