import React from 'react';
import './App.css';
import Card from './components/Card';
import data from './data/sample';

function App() {
  return (
    <div class="container">
      <Card
        album__image={data.album.images[1].url}
        album__name={data.album.name}
        title={data.name}
        artists={data.artists[0].name}
      />
    </div>
  );
}

export default App;
