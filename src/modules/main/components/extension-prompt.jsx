import React from 'react';
import extensionIcon from '../../../resources/icons/baseline-extension-24px.svg';
import './extension-prompt.css';

export default ({ dismissExtensionPrompt }) => (
  <div className="ExtensionPrompt">
    <span>
      Install PitchDB's podcast aggregator extension to search and get podcast feeds from websites you visit.
    </span>
    <a href="https://chrome.google.com/webstore/detail/pitchdb-podstation-podcas/hfeocebijeedjlglohkabglfeohpjioj"
      target="_blank" rel="noopener noreferrer">
      <button className="extension-button">
        <img src={extensionIcon} alt="extension-icon" />
        <span>Install chrome extension</span>
      </button>
    </a>
    <button className="dismiss-button" onClick={dismissExtensionPrompt}>
      Dismiss
    </button>
  </div>
);