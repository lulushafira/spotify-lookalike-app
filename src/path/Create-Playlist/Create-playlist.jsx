import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Searchbar from "../../components/Searchbar";
import Form from "../../components/Form";
import { useSelector } from "react-redux";
import styles from "./create-playlist.module.css"

const Home = () => {
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
    <div className={styles.home}>
        <main className={styles.container}>
          <div className={styles.form}>
            <Form 
              uriTracks={selectedTracksUri}
            />
          </div>
          <div className={styles.search__playlist}>
            <Searchbar
              onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}
            />

            <div className="">
              {tracks.length === 0 && <p></p>}

              <div className={styles.cards} data-testid = "tracks-list">
                {tracks.map((e) => (
                  <Card
                    key={e.id}
                    album__image={e.album.images[1].url}
                    album__name={e.album.name}
                    title={e.name}
                    artists={e.artists[0].name}
                    toggleSelect={() => toggleSelect(e)}
                    select={selectedTracksUri.includes(e.uri)}
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
