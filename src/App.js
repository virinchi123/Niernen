import React from 'react';
import './App.css';
import Main from './containers/Main/Main';
import Join from './containers/Join/Join';
import {Route} from 'react-router'

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Join} />
      <Route path='/game' component={Main} />
    </div>
  );
}

export default App;
