import React from 'react';

import ByeWeek from './ConditionalViews/ByeWeek';
import CaptainStartSession from './ConditionalViews/CaptainStartSession';
import ClimbsSubmitted from './ConditionalViews/ClimbsSubmitted';
import JoinCreateTeam from './ConditionalViews/JoinCreateTeam';
import JoinLeague from './ConditionalViews/JoinLeague';
import LeagueNotStarted from './ConditionalViews/LeagueNotStarted';
import NoLeague from './ConditionalViews/NoLeague';
import NotInLeague from './ConditionalViews/NotInLeagueUser';
import NotPaid from './ConditionalViews/NotPaid';
import UserStartSession from './ConditionalViews/UserStartSession';

function HomePage() {
  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your captain gave you to join their team</p>
      <button>Create Team</button>
      <button>Join Team</button>
    </div>
  );
}

export default HomePage;
