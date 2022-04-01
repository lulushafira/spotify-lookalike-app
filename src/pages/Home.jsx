import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import Searchbar from '../components/Searchbar';
import config from '../lib/config';
import './home.css'

const Home = () =>{
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  
  useEffect(() => {
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    
    setAccessToken(access_token);
    setIsAuthorized(access_token !== null);

    // console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  }, []);
  

  

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  const onSuccessSearch = (searchTracks) => {
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = searchTracks.filter(track => !selectedTracksUri.includes(track.uri));

    setTracks([...selectedTracks, ...searchDistincTracks]);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter(item => item !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
    }
  }

  const filterSelectedTracks = () => {

    return tracks.filter(track => selectedTracksUri.includes(track.uri));
  }

    return (
      <>
        {!isAuthorized && (
          <main className="center">
            <div>
              <p>Login to Spotify</p>
              <a href={getSpotifyLinkAuthorize()} className="authorize">Login</a>
            </div>
          </main>
        )}

        {isAuthorized && (
          <main className="container" id="home">
            <Searchbar
              accessToken={accessToken}
              onSuccess={(tracks) => onSuccessSearch(tracks)}
            />

            <div className="">
              {tracks.length === 0 && (
                <p></p>
              )}

              <div className="cards">
                {tracks.map((e) => (
                  <Card
                    key = {e.id}
                    album__image={e.album.images[1].url}
                    album__name={e.album.name}
                    title={e.name}
                    artists={e.artists[0].name}
                    toggleSelect={() => toggleSelect(e)}
                  />
                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
}

export default Home;



