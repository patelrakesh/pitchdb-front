import React from 'react';

const AppForm = ({ children, onSubmit }) => (
  <form id="current-form" onSubmit={(e) => {
    e.preventDefault();
    onSubmit();
  }}>
    {children}
  </form>
);

export default AppForm;