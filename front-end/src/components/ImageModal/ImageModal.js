import React, { useState, useEffect } from 'react';
import './ImageModal.css';
import axios from 'axios';
import EditModal from '../EditModal/EditModal';
import TagModal from '../TagModal/TagModal';

const ImageModal = (props) => {
    const [editVisible, setEditVisible] = useState(false);
    const [favourite, setFavourite] = useState(null);
    const [imageDetails, setImageDetails] = useState({});

    const closeModal = () => {
        props.toggleShowModal();
    }

    const handleEdit = () => {
        setEditVisible(true);
    }

    const closeEdit = () => {
        setEditVisible(false);
    }

    const handleDelete = event => {
        event.preventDefault();
        axios.delete(`http://localhost:5000/photos/${props.imgUrl.substring(37)}`, { headers: { 'authorization': localStorage.getItem("token") } })
            .then(() => {
                props.onFeedChange();
                closeModal();
            })
            .catch(err => console.log(err));
    }

    const toggleFavourite = () => {
        axios.put(`http://localhost:5000/photos/favourite/${props.imgUrl.substring(37)}`, { favourite: !favourite }, { headers: { 'authorization': localStorage.getItem("token") } })
            .then(() => {
                setFavourite(!favourite)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSubmitEdit = ({ who, what, where, when }) => {
        console.log(props.imgUrl);
        axios.put(`http://localhost:5000/photos/details/${props.imgUrl.substring(37)}`, { who, what, where, when }, { headers: { 'authorization': localStorage.getItem("token") } })
            .then(res => {
                setImageDetails(res.data);
                setEditVisible(false);
                props.onFeedChange();
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/photos/details/${props.imgUrl.substring(37)}`, { headers: { 'authorization': localStorage.getItem("token") } })
            .then(response => {
                setImageDetails(response.data);
                setFavourite(response.data.favourite);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="modal">
            <div className="image-modal-card">
                <p className="close-container" onClick={closeModal}>X</p>
                <div className="image-container">
                    <img
                        className="img"
                        onDoubleClick={toggleFavourite}
                        alt="post"
                        src={props.imgUrl}
                    />
                </div>
                {
                    editVisible
                        ?
                        <EditModal
                            closeEdit={closeEdit}
                            imageDetails={imageDetails}
                            onDelete={handleDelete}
                            onSubmitEdit={handleSubmitEdit}
                        />
                        :
                        <TagModal
                            favourite={favourite}
                            imageDetails={imageDetails}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSearch={props.onSearch}
                            onToggleFavourite={toggleFavourite}
                            closeModal={props.closeModal}
                        />
                }
            </div>
        </div>
    );
}

export default ImageModal;