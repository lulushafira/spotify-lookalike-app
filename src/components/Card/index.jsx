import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import Button from '../Button';

function Card({ album__image, album__name, title, artists }) {
  return (
    <div class="card-wrap">
      <div className="content">
        <img className="img-album" src={album__image} alt={album__name} />
        <div className="info">
          <h3>{title}</h3>
          <p>{artists}</p>
        </div>
        <input className="btn-card " type="button" value="Select" />
      </div>
    </div>
  );
}

Card.propTypes = {
  album__image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
}

// import React from 'react';
// import './index.css';
// import PropTypes from 'prop-types';
// import Button from '../Button';

// export default function Card({ imageUrl, title, artist }) {
//   return (
//     <div className="card">
//       <div className="card__image">
//         <img src={imageUrl} alt={title} />
//       </div>

//       <div className="card__data">
//         <div className="card__content">
//           <h3 className="card__title">{title}</h3>
//           <p className="card__artist">{artist}</p>
//         </div>
        
//         <div className="card__action">
//           <Button variant="secondary">Select</Button>
//         </div>
//       </div>
//     </div>
//   );
// }



export default Card;
