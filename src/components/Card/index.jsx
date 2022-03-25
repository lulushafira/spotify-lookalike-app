import React from "react";
import "./index.css";

function Card({ album__image, album__name, title, artists }) {
  return (
    <div class="card-wrap">
      <div className="content">
        <img className="img-album" src={album__image} alt={album__name} />
        <div className="info">
          <h3>{title}</h3>
          <p>{artists}</p>
        </div>
        <input className="btn " type="button" value="Select" />
      </div>
    </div>
  );
}

export default Card;
