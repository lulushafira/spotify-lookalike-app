import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTracksToPlaylist, createPlaylist } from "../../lib/fetchAPI";
import styles from "./index.module.css";

const sendFormNetworkCall = (data) => console.log(data);

const Form = ({ uriTracks }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    sendFormNetworkCall(form);

    try {
      const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
        name: form.title,
        description: form.description,
      });

      await addTracksToPlaylist(
        accessToken,
        responseCreatePlaylist.id,
        uriTracks
      );

      toast.success('Playlist created successfully');

      setForm({ title: "", description: "" });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  return (
    <form className={styles.form} onSubmit={handleForm}>
      <div className={styles.form__content}>
        <div className={styles.form__header}>
          <h4 className={styles.form__title}>Create Playlist</h4>
        </div>
        <div className={styles.form__body}>
          <div className="title">
            <p htmlFor="title">Title</p>
            <input
              className={styles.input}
              minLength={10}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.desc}>
            <p htmlFor="description">Description</p>
            <input
              className={styles.input}
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.form__footer}>
          <button className={styles.submit}>Create</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
