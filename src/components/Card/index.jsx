import React, {useState}from "react";
import "./index.css";
import PropTypes from "prop-types";

function Card({ album__image, album__name, title, artists,toggleSelect }) {
 
  const [isSelected, setIsSelected] = useState(false);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="card-wrap">
      <div className="content">
        <img className="img-album" src={album__image} alt={album__name} />
        <div className="info">
          <h3>{title}</h3>
          <p>{artists}</p>
        </div>
        <button className="btn-select" onClick={handleToggleSelect} >{isSelected ? 'Deselect' : 'Select'}</button>
      </div>
    </div>

   
  );
}



Card.propTypes = {
  album__image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
}



export default Card;
