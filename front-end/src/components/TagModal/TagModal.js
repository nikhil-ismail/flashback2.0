import React, {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHear } from '@fortawesome/free-regular-svg-icons'

import './TagModal.css';

const TagModal = (props) => {
    const [favourite, setFavourite] = useState(props.favourite);

    const toggleFavourite = (event) => {
        event.preventDefault();
        setFavourite(!favourite);
        props.onToggleFavourite();
    }

    const handleClick = detail => {
        if (detail === 'who') {
            props.onSearch(props.imageDetails.who);
        } else if (detail === 'where') {
            props.onSearch(props.imageDetails.location);
        } else if (detail === 'when') {
            props.onSearch(props.imageDetails.time_of_memory);
        } else if (detail === 'what') {
            props.onSearch(props.imageDetails.what);
        }
        props.closeModal();
    }

    return (
        <div className="tagmodal-container">
            <div className="tag-body">
                <div className="tags">
                    {
                        props.imageDetails.who && 
                        <div className="tag-detail-wrapper">
                            <div className="tag-intro">Tagged</div>
                            <div onClick={() => handleClick('who')} name="who" className="tag-value">{props.imageDetails.who}</div>
                        </div>
                    }
                    {
                        props.imageDetails.location &&
                        <div className="tag-detail-wrapper">
                            <div className="tag-intro">Where</div>
                            <div onClick={() => handleClick('where')} name="where" className="tag-value">{props.imageDetails.location}</div>
                        </div>
                    }
                    {
                        props.imageDetails.time_of_memory &&
                        <div className="tag-detail-wrapper">
                            <div className="tag-intro">When</div>
                            <div onClick={() => handleClick('when')} name="when" className="tag-value">{props.imageDetails.time_of_memory}</div>
                        </div>
                    }
                    {
                        props.imageDetails.what &&
                        <div className="tag-detail-wrapper">
                            <div className="tag-intro">What</div>
                            <div onClick={() => handleClick('what')} name="what" className="tag-value">{props.imageDetails.what}</div>
                        </div>
                    }
                </div>
            </div>
            <div className="tagmodal-btns">
                {
                    favourite
                    ?
                    <FontAwesomeIcon icon={faHeart} size="lg" className="favourite favourite-icon" onClick={toggleFavourite}/>
                    :
                    <FontAwesomeIcon icon={farHear} size="lg" className="favourite" onClick={toggleFavourite}/>
                }
                <FontAwesomeIcon icon={faEdit} size="lg" className="edit" onClick={props.onEdit} />
                <FontAwesomeIcon icon={faTrash} size="lg" className="delete" onClick={props.onDelete}/>
            </div>
        </div>
    );
}

export default TagModal;