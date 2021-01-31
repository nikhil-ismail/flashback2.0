import React, { useState } from 'react';
import ImageModal from '../ImageModal/ImageModal';
import './Feed.css';

const Feed = (props) => {

  const [showModal, setShowModal] = useState(false);

  const imgUrl = `http://localhost:5000/uploads/${props.postData.img_path}`;

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
      setShowModal(false);
  }

  return (
      <div className="feed-container">
        <img src={imgUrl} alt={props.imgPath} onClick={openModal} />
        <ImageModal showModal={showModal} closeModal={closeModal} imgUrl={imgUrl} postData={props.postData} />
      </div>
  );
}

export default Feed;