import React, { useState, useEffect} from 'react'
import config from '../../lib/config';
import './index.css'

const Searchbar = ({accessToken, onSuccess}) =>{
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    var requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      alert(e);
    }
}

    return (
      <form className="form-search" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="form-search-input"
          required
          onChange={handleInput}
        />
        <button type="submit" className='btn-search'>Search</button>
      </form>
    )
}

export default Searchbar;