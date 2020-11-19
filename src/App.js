import React,{useState} from 'react';
import './App.css';
import Main from './containers/Main/Main';
import Join from './containers/Join/Join';
import {Route} from 'react-router';
import {useLocation } from 'react-router-dom';

function App() {


  const [inGame,setInGame]=useState(false)

  const location = useLocation();

  let mainCode = null;

  

  return (
    <div className="App">
      <Route path='/' exact render={()=><Join setInGame={setInGame}/>} />
      <Route path='/game' component={Main}/>
    </div>
  );
}

export default App;
