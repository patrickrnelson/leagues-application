import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
          RULES
          1. Team members must climb together
          2. A climb is considered “sent” or “completed” when the climber:
          ** Shows control on the start (climber must hold the hand tag & number tag and remove all body weight from the floor).
          ** Ascends the wall using only the specified color hold or taped holds. If a climber uses another hold, on purpose or accident, the climb will be invalid and cannot be submitted for points.
          ** Grabs the top of the wall. The top must be grabbed with two hands, and be held, in control, for at least 5 seconds.
          3. All volumes and features are on.
          4. Help may be given both on and off the wall
          5. Don't be a sandbaggin' SOB - If you are caught sandbagging (climbing below your ability level to try to maximize points), you will be bumped, and points from previous weeks will be adjusted.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
