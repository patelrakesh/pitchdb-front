// Functional component using hooks
import React, { useState, useEffect } from 'react';
import OutreachSequencesGmailPanel from '../components/outreach-sequences-gmail';

const OutreachSequencesGmail = (props) => {
  return (
    <OutreachSequencesGmailPanel {...props} />
  );
};

export default OutreachSequencesGmail;