import React, { useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

function Card({
  album__image,
  album__name,
  title,
  artists,
  toggleSelect,
  select,
}) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  };

  return (
    <div className={styles.card__wrap}>
      <div className={styles.card__content}>
        <img
          className={styles.img__album}
          src={album__image}
          alt={album__name}
        />
        <div className={styles.info__wrap}>
          <div className={styles.info__content}>
            <h3 className={styles.info__song}>{title}</h3>
            <p className={styles.info__song}>{artists}</p>
            <p className={styles.info__song}>{album__name}</p>
          </div>
          <div className={styles.info__btn}>
          <button className={styles.btn__select} onClick={handleToggleSelect}>
              {isSelected ? "Deselect" : "Select"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  album__image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
};

export default Card;
