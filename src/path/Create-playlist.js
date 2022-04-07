import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import "../pages/home.css";

const Home = () => {
  const isAuthorized = useSelector((state)=> state.auth.isLogin);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
 
  const tokenSpotify = useSelector((state) => state.auth.accessToken);
	console.log(tokenSpotify);


  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);
    
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
    </div>
  );
};

export default Home;
