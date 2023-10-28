import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import Router, Route, and Switch
import './App.css';
import BreweriesList from './BreweriesList';
import BreweryDetail from './BreweryDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:id" component={BreweryDetail} />
          <Route path="/" component={BreweriesList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;