import React, { useState } from 'react';
import ImageModal from '../ImageModal/ImageModal';
import './Feed.css';

const Feed = (props) => {

  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="feed-container">
      <img className="feed-img" id="shadow" src={props.imgUrl} alt={props.imgUrl} onClick={toggleShowModal} />
      {
        showModal &&
        <ImageModal
          toggleShowModal={toggleShowModal}
          imgUrl={props.imgUrl}
          onFeedChange={props.onFeedChange}
          onSearch={props.onSearch}
        />
      }
    </div>
  );
}

export default Feed;