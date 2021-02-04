import React, {useState} from 'react';
import axios from 'axios';
import './ImageModal.css';
import EditModal from '../EditModal/EditModal';
import TagModal from '../TagModal/TagModal';
import favouriteFile from './favourite.png';
import notFavouriteFile from './not-favourite.png';

const ImageModal = (props) => {
    const [favourite, setFavourite] = useState(props.postData.favourite);
    const [editVisible, setEditVisible] = useState(false);
    const who = props.postData.who;
    const where = props.postData.location;
    const when = props.postData.time_of_memory;
    const what = props.postData.what;

    const closeModal = (event) => {
        props.closeModal();
    }

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

    const handleEdit = (event) => {
        setEditVisible(true);
    }

    const closeEdit = (event) => {
        setEditVisible(false);
    }
    
    if (props.showModal) {
        return (
            <div className="modal">
                <div className="image-modal-card">
                    <img className="modal-image" style={{width: '50%', height: '100%', objectFit: 'contain'}} alt="post" src={props.imgUrl} />
                    <div className="details-container">
                        {
                        editVisible
                        ?
                        <EditModal refreshDetails={props.refreshDetails} who={who} where={where} when={when} what={what} closeEdit={closeEdit} imgUrl={props.imgUrl} />
                        :
                        <TagModal who={who} where={where} when={when} what={what} handleEdit={handleEdit} />
                        }
                        <div className="love-close-btns">
                            {
                                favourite
                                ?
                                <img className="favourite-img" src={favouriteFile} alt="click to make favourite" onClick={handleLove} />
                                :
                                <img className="favourite-img" src={notFavouriteFile} alt="click to unfavourite" onClick={handleLove} />
                            }
                            <input
                                type="button"
                                value="Close"
                                className="upload-close"
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default ImageModal;