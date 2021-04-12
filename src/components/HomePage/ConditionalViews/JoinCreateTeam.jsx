import React from 'react';

// This view will show when the user is not on a team
function JoinCreateTeam() {

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>To get started create a team or use the code your team captain gave you to join their team</p>
      <button>Create Team</button>
      <button>Join Team</button>
    </div>
  );
}

export default JoinCreateTeam;
