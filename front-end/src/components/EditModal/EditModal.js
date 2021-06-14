import React, {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './EditModal.css';

const EditModal = (props) => {
    const [who, setWho] = useState(props.imageDetails.who);
    const [where, setWhere] = useState(props.imageDetails.location);
    const [when, setWhen] = useState(props.imageDetails.time_of_memory);
    const [what, setWhat] = useState(props.imageDetails.what);

    const handleDetails = event => {
        const {name} = event.target;
        const {value} = event.target;
        
        if (name === 'who') {
            setWho(value);
        } else if (name === 'where') {
            setWhere(value);
        } else if (name === 'when') {
            setWhen(value);
        } else if (name === 'what') {
            setWhat(value);
        }
    }

    const handleCancel = event => {
        event.preventDefault();
        props.closeEdit();
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        props.onSubmitEdit({ who, what, where, when });
    }

    return (
        <div className="editmodal-container">
            <div className="body">
                <div className="who-where">
                    <div className="detail-wrapper">
                        <div className="intro">Tagged</div>
                        <input type="text" placeholder={props.imageDetails.who} value={who} className="value-edit" name="who" onChange={handleDetails} />
                    </div>
                    <div className="detail-wrapper">
                        <div className="intro">Where</div>
                        <input type="text" placeholder={props.imageDetails.location} value={where} className="value-edit" name="where" onChange={handleDetails} />
                    </div>
                </div>
                <div className="when-what">
                    <div className="detail-wrapper">
                        <div className="intro">When</div>
                        <input type="text" placeholder={props.imageDetails.time_of_memory} value={when} className="value-edit" name="when" onChange={handleDetails} />
                    </div>
                    <div className="detail-wrapper">
                        <div className="intro">What</div>
                        <input type="text" placeholder={props.imageDetails.what} value={what} className="value-edit" name="what" onChange={handleDetails} />
                    </div>
                </div>
            </div>
            <div className="tagmodal-btns">
                <div className="cancel">
                    <button className="edit-btn" onClick={handleCancel}>Cancel</button>
                </div>
                <div className="confirm">
                    <button className="edit-btn" onClick={handleFormSubmit}>Confirm</button>
                </div>
                <FontAwesomeIcon icon={faTrash} size="lg" className="delete" onClick={props.onDelete} />
            </div>
        </div>
    );
}

export default EditModal;