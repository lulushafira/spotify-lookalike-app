import React, { ChangeEventHandler, FormEventHandler, useState} from 'react'
import styles from'./index.module.css'
import { searchTrack } from '../../lib/fetchAPI';
import { useSelector } from 'react-redux';
import { TRootState } from '../../store'
import Textfield from '@mui/material/TextField';

interface AppProps{
  onSuccess: (tracks: any[])=>void;
}


const Searchbar: React.FC<AppProps> = ({onSuccess} ) =>{
  const accessToken:string = useSelector((state: TRootState)=> state.auth.accessToken);
  const [text, setText] = useState<string>('');

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e)=> {
    setText(e.target.value);
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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
      <form className={styles.form__search} onSubmit={onSubmit}>
        <Textfield label="Search"
          id="outlined-size-small"
          size="small"
          type="text"
          className={styles.form__search__input}
          required
          onChange={handleInput}
          data-testid="searchbar"
        />
        <button 
          type="submit" 
          className={styles.btn__search}
          data-testid="button_search"
          >Search</button>
      </form>
    )
}

export default Searchbar;