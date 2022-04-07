import React from "react";
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"
import { useSelector } from "react-redux";
import "./App.css";
// import Home from './pages/Home';
import Login from './path/Login';
import MainPage from './path/Create-playlist';



function App() {
  const accessToken = useSelector((state)=> state.auth.accessToken);
   return (
     <BrowserRouter>
        {/* <div>
          <ul>
            <li>
              <Link to="/create-playlist">Playlist</Link>
            </li>
          </ul>
        </div> */}
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
