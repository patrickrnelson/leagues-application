import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import ReactModal from 'react-modal';

import { useDispatch } from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import AddClimb from '../AddClimb/AddClimb';
import AdminClimber from '../Admin/AdminClimber';
import AdminCreate from '../Admin/AdminCreate';
import AdminEdit from '../Admin/AdminEdit';
import AdminLeagues from '../Admin/AdminLeagues';
import AdminTeams from '../Admin/AdminTeams';
import ClimberPage from '../ClimberPage/ClimberPage';
import ClimberProfile from '../ClimberProfile/ClimberProfile';
import ClimberProfileEdit from '../ClimberProfileEdit/ClimberProfileEdit';
import ClimbingSession from '../ClimbingSession/ClimbingSession';
import CreateTeam from '../CreateTeam/CreateTeam';
import HomePage from '../HomePage/HomePage';
import JoinTeam from '../JoinTeam/JoinTeam';
import LandingPage from '../LandingPage/LandingPage';
import Leaderboard from '../Leaderboard/Leaderboard';
import RulesPage from '../RulesPage/RulesPage';
import TeamPage from '../TeamPage/TeamPage';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#272727',
    },
    secondary: {
      main: '#E66B06',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_CONDITIONAL' });
  }, [dispatch]);

  // ReactModal.setAppElement('#root');
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* About Page - Unprotected */}
          <Route exact path="/about">
            <AboutPage />
          </Route>

          {/* Rules Page - Unprotected */}
          <Route exact path="/rules">
            <RulesPage />
          </Route>

          {/* Admin - leagues view */}
          <ProtectedRoute exact path="/admin/leagues">
            <AdminLeagues />
          </ProtectedRoute>

          {/* Admin - create a league */}
          <ProtectedRoute exact path="/admin/leagues/new">
            <AdminCreate />
          </ProtectedRoute>

          {/* Admin - edit a league */}
          <ProtectedRoute exact path="/admin/leagues/edit/:id">
            <AdminEdit />
          </ProtectedRoute>

          {/* Admin - view climbers*/}
          <ProtectedRoute
            exact
            path="/admin/climbers/:id"
          >
            <AdminClimber />
          </ProtectedRoute>

          {/* Admin - view teams*/}
          <ProtectedRoute exact path="/admin/teams">
            <AdminTeams />
          </ProtectedRoute>

          {/* Homepage - not on a team */}
          <ProtectedRoute exact path="/home">
            <HomePage />
          </ProtectedRoute>

          {/* Create a team page */}
          <ProtectedRoute exact path="/team/create">
            <CreateTeam />
          </ProtectedRoute>

          {/* Join a team page */}
          <ProtectedRoute exact path="/team/join">
            <JoinTeam />
          </ProtectedRoute>

          {/* My team */}
          <ProtectedRoute exact path="/team">
            <TeamPage />
          </ProtectedRoute>

          {/* Climber Details */}
          <ProtectedRoute exact path="/climber/:id">
            <ClimberPage />
          </ProtectedRoute>

          {/* Climber contact */}
          <ProtectedRoute exact path="/climberProfile">
            <ClimberProfile />
          </ProtectedRoute>

          {/* Climber Profile - Edit */}
          <ProtectedRoute exact path="/climber/profile/edit">
            <ClimberProfileEdit />
          </ProtectedRoute>

          {/* Climb Session */}
          <ProtectedRoute exact path="/climb/session">
            <ClimbingSession />
          </ProtectedRoute>

          {/* Add a climb */}
          <ProtectedRoute exact path="/climb/add">
            <AddClimb />
          </ProtectedRoute>

          {/* League leaderboard */}
          <ProtectedRoute exact path="/leaderboard">
            <Leaderboard />
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          {/* <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute> */}

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
