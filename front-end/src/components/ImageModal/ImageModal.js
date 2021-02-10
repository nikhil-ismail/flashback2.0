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
        let mounted = true;
        if (mounted) {
            axios.put(`http://localhost:5000/favourite/${props.imgUrl.substring(30)}`, {favourite: !favourite})
            .then(res => {
                setFavourite(!favourite)
            })
            .catch(err => {
                console.log(err);
            })
        }

        return () => mounted = false;
    }

    if (props.showModal) {
        return (
            <div className="modal">
                <div className="image-modal-card">
                    <img 
                        onDoubleClick={handleLove}
                        className="modal-image"
                        style={{width: '66%', height: '100%', objectFit: 'contain'}}
                        alt="post"
                        src={props.imgUrl}
                    />
                    {
                        editVisible
                        ?
                        <EditModal closeEdit={closeEdit} imgUrl={props.imgUrl} />
                        :
                        <TagModal
                            favourite={favourite}
                            imgUrl={props.imgUrl}
                            handleEdit={handleEdit}
                            onFeedChange={props.onFeedChange}
                            onSearch={props.onSearch}
                            closeModal={props.closeModal}
                        />
                    }
                </div>
                <div className="close-container">
                    <input
                        type="button"
                        value="asdfadsjfdisadsjfdklsa;"
                        className="upload-close"
                        onClick={closeModal}
                    />
                </div>
            </div>
        );
    }
    return null;
}

export default ImageModal;
