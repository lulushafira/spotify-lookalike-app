import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import { useSelector } from "react-redux";
import Login from './path/Login/Login.jsx';
import MainPage from './path/Create-Playlist/Create-playlist.jsx';



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
    )

  
}

export default App;
