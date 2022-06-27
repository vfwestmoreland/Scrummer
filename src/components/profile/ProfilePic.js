import React, { useState, useEffect } from 'react';
import { storage, upload } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';

export const CreateProfilePic = () => {
  const { user } = UserAuth()
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, setLoading);
  }

  useEffect(() => {
      setPhotoURL(photoURL);
  }, [])

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="Avatar" className="avatar" />
    </div>
  );
};