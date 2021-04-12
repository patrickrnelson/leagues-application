import React from 'react';

import HamburgerNav from '../HamburgerNav/HamburgerNav'
import Header from '../Header/Header'

function HomePage() {
  return (
    <div className="container">
      <Header />
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your captain gave you to join their team</p>
      <button>Create Team</button>
      <button>Join Team</button>
    </div>
  );
}

export default HomePage;
