import React from 'react';
import LoadingIcon from '../../general/components/loading-icon';
import './blank-loading-screen.css';

const BlankLoadingScreen = () => (
  <div className="BlankLoadingScreen container-fluid">
    <LoadingIcon size="loading-huge" />
  </div>
);

export default BlankLoadingScreen;