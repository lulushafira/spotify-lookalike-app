import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import Form from "../components/Form";
import config from "../lib/config";
import { getUserProfile } from '../lib/fetchAPI';
import { toast } from 'react-toastify';
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";

const Home = () => {
  const isAuthorized = useSelector((state)=> state.auth.isLogin);
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);



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
        } catch (e) {
          toast.error(e);
        }
      }

      setUserProfile();
    }
  }, []); 

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

    const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }


  const clearSearch = () => {
    setTracks(selectedTracks);
    setIsInSearch(false);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <div className="home">
      {!isAuthorized && (
        <main className="center">
          <div>
            <p>Login to Spotify</p>
            <a href={getSpotifyLinkAuthorize()} className="authorize">
              Login
            </a>
          </div>
        </main>
      )}

      {isAuthorized && (
        <main className="container">
          <div className="form">
            <Form 
              uriTracks={selectedTracksUri}
            />
          </div>
          <div className="search__playlist">
            <Searchbar
              onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}
            />

            <div className="">
              {tracks.length === 0 && <p></p>}

              <div className="cards">
                {tracks.map((e) => (
                  <Card
                    key={e.id}
                    album__image={e.album.images[1].url}
                    album__name={e.album.name}
                    title={e.name}
                    artists={e.artists[0].name}
                    toggleSelect={() => toggleSelect(e)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
