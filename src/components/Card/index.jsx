import React from 'react';
import './index.css';
import data  from '../../data/sample.js';

function Card() {
  return (
    <div class="card-wrap">
      <div class="content">
        <img class="img-album" src={data.album.images[1].url} alt={data.album.name}/>
        <h3>{data.name}</h3>
        <p>{data.artists[0].name}</p>    
        <input class="btn "type="button" value="Select" />
      </div>
    </div>
  );
}

export default Card;
