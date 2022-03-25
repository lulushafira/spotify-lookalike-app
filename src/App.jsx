import React from "react";
import "./App.css";
import Card from "./components/Card";
import data from "./data/sample";

function App() {
  return (
    <div className="container">
      <div className="cards">
        {data.map((e) => (
          <Card
            album__image={e.album.images[1].url}
            album__name={e.album.name}
            title={e.name}
            artists={e.artists[0].name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
