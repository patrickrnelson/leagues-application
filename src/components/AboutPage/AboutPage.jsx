import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>* SIX WEEK SEASON
          * TEAMS OF THREE
          * $100 PER TEAM
          * WIN PRIZES!

          NO AGE LIMIT
          NO ABILITY RESTRICTIONS - all levels welcome and can be mixed within the team (V0 climbers can team with V10 climbers)

          HOW IT WORKS
          ** MUST CLIMB ONCE/WEEK between Mon-Thurs with your team. Reserve a spot on the wall using MINDBODY app.
          ** Each week, check in at the Front Desk to collect your team Scorecard.
          ** First week you MUST complete a climbing survey to determine scoring for your team.
          ** MUST SUBMIT 10 CLIMBS PER WEEK -- Log all your climbs, or just top 10. In the end the top 10 will be counted. Each climber needs to submit 3 different climbs, the 10th climb can come from any team member.

          PRICING
          Each team of 3 pays a total of $100 to be entered into league. This gives you FREE access to the wall when you come in to climb for league, scoring sheets, and the ability to win some awesome prizes! Shoe & chalk rentals not included.

          HANDICAP SCORING SYSTEM
          Climbers will fill out a short survey their first week about their climbing ability. Based upon this and their scoring week to week, a handicap will be determined. 
          For example, a V8 climber earns the same points for an 8 that a V3 climber earns for a 3. Handicaps are flexible, and can be adjusted as the season progresses. Guys, don't worry, this will be FAIR & SQUARE (whatever that actually means).

          Climbing above your current level will also earn you points, for every climb climbed above your level you will earn an additional 2 points, but it will then become your base level the next week. Your handicap can and will be adjusted weekly, but your handicap may also remain the same!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
