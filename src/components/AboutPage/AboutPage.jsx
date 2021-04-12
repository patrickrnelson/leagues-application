import React from 'react';

import Header from '../Header/Header'

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function AboutPage() {

  // Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  // End Material UI

  return (
    <div className="container">
      <Header />
      <h2>About</h2>
      <List>
        <ListItem>
          * SIX WEEK SEASON
        </ListItem>
        <ListItem>
          * TEAMS OF THREE
        </ListItem>
        <ListItem>
          * $100 PER TEAM
        </ListItem>
        <ListItem>
          * WIN PRIZES!
        </ListItem>
        <ListItem>
          NO AGE LIMIT
        </ListItem>
        <ListItem>
          NO ABILITY RESTRICTIONS - all levels welcome and can be mixed within the team (V0 climbers can team with V10 climbers)
        </ListItem>
      </List>
      <List> 
        HOW IT WORKS
        <ListItem>
          ** MUST CLIMB ONCE/WEEK between Mon-Thurs with your team. Reserve a spot on the wall using MINDBODY app.
        </ListItem>
        <ListItem>
          ** MUST SUBMIT 10 CLIMBS PER WEEK -- Log all your climbs, or just top 10. In the end the top 10 will be counted. Each climber needs to submit 3 different climbs, the 10th climb can come from any team member.
        </ListItem>
      </List>
      <List>
        PRICING
        <ListItem>
          Each team of 3 pays a total of $100 to be entered into league. This gives you FREE access to the wall when you come in to climb for league, scoring sheets, and the ability to win some awesome prizes! Shoe & chalk rentals not included.
        </ListItem>
      </List>
      <List>
        HANDICAP SCORING SYSTEM
        <ListItem>
          For example, a V8 climber earns the same points for an 8 that a V3 climber earns for a 3. Handicaps are flexible, and can be adjusted as the season progresses. Guys, don't worry, this will be FAIR & SQUARE (whatever that actually means).
        </ListItem>
        <ListItem>
          Climbing above your current level will also earn you points, for every climb climbed above your level you will earn an additional point, but it will then become your base level the next week. Your handicap can and will be adjusted weekly, but your handicap may also remain the same!
        </ListItem>
      </List>
    </div>
  );
}

export default AboutPage;
