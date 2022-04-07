import React, { useEffect} from "react";
import config from "../lib/config";
import { getUserProfile } from '../lib/fetchAPI';
import { toast } from 'react-toastify';
import "../pages/home.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const isAuthorized = useSelector((state)=> state.auth.isLogin);
  const dispatch = useDispatch();
//   const history = useHistory();

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);
          //called getUserProfile function from fetchAPI

          dispatch(login({
            accessToken:accessTokenParams,
            user:response,
          }));
        //   history.push('/');
        } catch (e) {
          toast.error(e);
        }
        
      }

      setUserProfile();
    }
  }, []); 

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };


  return (
    <div className="home">
        <main className="center">
          <div>
            <p>Login to Spotify</p>
            <a href={getSpotifyLinkAuthorize()} className="authorize">
              Login
            </a>
          </div>
        </main>
    </div>
  );
};

export default Login;
