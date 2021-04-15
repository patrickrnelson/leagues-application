import React from 'react';

// this will show when the team is in a league and have not paid
function NotPaid() {

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>Your team has not paid. Please pay in order to proceed</p>
      <p>If you have paid please contact Nature of the North so your status can be updated</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default NotPaid;
