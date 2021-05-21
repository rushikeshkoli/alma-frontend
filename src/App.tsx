import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import Homepage from './Components/Homepage';
import NewRecord from './Components/NewRecord';
import Leaderboard from './Components/Leaderboard'
import './App.css';



function App() {
  return (
    <div className="border-solid border-4 border-light-blue-500">
      <Router>
        <Switch>
          <Route exact path="/"><Homepage /></Route>
          <Route exact path="/newrecord"><NewRecord /></Route>
          <Route exact path="/leaderboard"><Leaderboard /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
