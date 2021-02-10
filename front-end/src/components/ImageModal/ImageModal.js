import React, {useState, useEffect} from 'react';
import './ImageModal.css';
import axios from 'axios';
import EditModal from '../EditModal/EditModal';
import TagModal from '../TagModal/TagModal';

const ImageModal = (props) => {
    const [editVisible, setEditVisible] = useState(false);
    const [favourite, setFavourite] = useState(null);

    const closeModal = (event) => {
        props.closeModal();
    }

    const handleEdit = (event) => {
        setEditVisible(true);
    }

    const closeEdit = (event) => {
        setEditVisible(false);
    }

    const handleDelete = event => {
        event.preventDefault();
        console.log('here');
        axios.delete(`http://localhost:5000/delete/${props.imgUrl.substring(30)}`)
        .then(response => {
            props.onFeedChange();
            closeModal();
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/details/${props.imgUrl.substring(30)}`)
        .then(response => {
            setFavourite(response.data.favourite);
        })
        .catch(err => console.log(err));
    })

    const handleLove = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/favourite/${props.imgUrl.substring(30)}`, {favourite: !favourite})
        .then(res => {
            setFavourite(!favourite)
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (props.showModal) {
        return (
            <div className="modal">
                <div className="close-container">
                    <input
                        type="button"
                        value="x"
                        className="upload-close"
                        onClick={closeModal}
                    />
                </div>
                <div className="image-modal-card">
                    <div className="image-container">
                        <img 
                            className="img"
                            onDoubleClick={handleLove}
                            alt="post"
                            src={props.imgUrl}
                        />
                    </div>
                    {
                        editVisible
                        ?
                        <EditModal
                            closeEdit={closeEdit}
                            onDelete={handleDelete}
                            imgUrl={props.imgUrl}
                        />
                        :
                        <TagModal
                            favourite={favourite}
                            imgUrl={props.imgUrl}
                            handleEdit={handleEdit}
                            onDelete={handleDelete}
                            onFeedChange={props.onFeedChange}
                            onSearch={props.onSearch}
                            closeModal={props.closeModal}
                        />
                    }
                </div>
            </div>
        );
    }
    return null;
}

export default ImageModal;