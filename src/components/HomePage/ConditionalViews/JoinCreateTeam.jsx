import React from 'react';
import { useHistory } from 'react-router-dom';

// This view will show when the user is not on a team
function JoinCreateTeam() {
  const history = useHistory();

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your team captain gave you to join their team</p>
      <button onClick={(() => history.push('/team/create'))}>Create Team</button>
      <button onClick={(() => history.push('/team/join'))}>Join Team</button>
    </div>
  );
}

export default JoinCreateTeam;
