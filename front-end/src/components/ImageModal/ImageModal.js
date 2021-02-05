import React, {useState} from 'react';
import './ImageModal.css';
import EditModal from '../EditModal/EditModal';
import TagModal from '../TagModal/TagModal';

const ImageModal = (props) => {
    const [editVisible, setEditVisible] = useState(false);

    const closeModal = (event) => {
        props.closeModal();
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
                                <TagModal imgUrl={props.imgUrl} handleEdit={handleEdit} />
                            }
                        <div className="delete">
                            <p className="delete-btn" onClick={props.handleEdit}>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ImageModal;
