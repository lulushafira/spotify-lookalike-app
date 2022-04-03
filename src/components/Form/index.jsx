import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchAPI';
import './index.css';

const sendFormNetworkCall = (data) => console.log(data);

const Form = ({ accessToken, userId, uriTracks }) =>{
    const [form, setForm] = useState({
        title:'',
        description:''
    });

    
    const handleForm = async (e) =>{
        e.preventDefault();
        sendFormNetworkCall(form);

        try {
            const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
              name: form.title,
              description: form.description,
            });
    
            await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);
    
            toast.success('Playlist created successfully');
    
            setForm({ title: '', description: '' });
          } catch (error) {
            toast.error(error);
          }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
        console.log(form);
    };


    return(
        <form className="form" onSubmit={handleForm}>
            <div className="form__content">
                <div className="form__header">
                    <h4 className="form__title">Create Playlist</h4>
                </div>
                <div className="form__body">
                    <div className="title">
                        <p htmlFor="title">Title</p>
                        <input
                            className='input'
                            minLength={10}
                            type="text" 
                            name='title' 
                            value={form.title} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="desc">
                        <p htmlFor="description">Description</p>
                        <input
                            className='input'
                            type="text" 
                            name='description' 
                            value={form.description} 
                            onChange={handleChange}  
                        />
                    </div>
                </div>
                <div className="form__footer">
                    <button className="submit">Create</button>
                </div>
            </div>
        </form>
    );

}

export default Form;