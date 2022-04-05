import React, { useState} from 'react'
import './index.css'
import { searchTrack } from '../../lib/fetchAPI';
import { useSelector } from 'react-redux';

const Searchbar = ({onSuccess}) =>{
  const accessToken = useSelector((state)=> state.auth.accessToken);
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);


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