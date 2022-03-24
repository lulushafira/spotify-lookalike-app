import React from 'react';
import './index.css';

function Card({album__image, album__name, title, artists}) {
  return (
    <div class="card-wrap">
      <div class="content">
        <img class="img-album" src={album__image} alt={album__name}/>
        <h3>{title}</h3>
        <p>{artists}</p>    
        <input class="btn "type="button" value="Select" />
      </div>
    </div>
  );
}

export default Card;
