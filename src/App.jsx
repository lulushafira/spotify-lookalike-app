import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import { useSelector } from "react-redux";
import styles from "./App.module.css";
import Login from './path/Login/Login.js';
import MainPage from './path/Create-Playlist/Create-playlist.js';



function App() {
  const accessToken = useSelector((state)=> state.auth.accessToken);
   return (
     <BrowserRouter>
        <Switch>
          <Route path="/create-playlist">
            {accessToken !== "" ? <MainPage/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/">
            {accessToken !== "" ? <Redirect to="/create-playlist"/> : <Login/>}
          </Route>
        </Switch>
     </BrowserRouter>
      // <div className="app">
      //   <Home/>
      // </div>
    )

  
}

export default App;
