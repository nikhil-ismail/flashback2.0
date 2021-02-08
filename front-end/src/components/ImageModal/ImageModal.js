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

    const handleDelete = event => {
        event.preventDefault();
        console.log('here');
        axios.delete(`http://localhost:5000/delete/${props.imgUrl.substring(30)}`)
        .then(response => {
            console.log(response);
            props.closeModal();
        })
        .catch(err => console.log(err));
    }

    if (props.showModal) {
        return (
            <div className="modal">
                <div className="image-modal-card">
                    <img 
                    onDoubleClick={handleLove}
                    className="modal-image"
                    style={{width: '50%', height: '100%', objectFit: 'contain'}}
                    alt="post"
                    src={props.imgUrl} />
                    <div className="details-container">
                        <div className="close-container">
                            <input
                                type="button"
                                value="X"
                                className="upload-close"
                                onClick={closeModal}
                            />
                        </div>
                            {
                                editVisible
                                ?
                                <EditModal closeEdit={closeEdit} imgUrl={props.imgUrl} />
                                :
                                <TagModal favourite={favourite} imgUrl={props.imgUrl} handleEdit={handleEdit} />
                            }
                        <div className="delete">
                            <p className="delete-btn" onClick={handleDelete}>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ImageModal;
