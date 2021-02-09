import React, {useState, useEffect} from 'react';
import axios from 'axios';
import fullheart from './fullheart.png';
import emptyheart from './emptyheart.png';
import edit from './edit.png';
import './TagModal.css';

const TagModal = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [who, setWho] = useState(null);
    const [where, setWhere] = useState(null);
    const [when, setWhen] = useState(null);
    const [what, setWhat] = useState(null);
    const [favourite, setFavourite] = useState(null);

    const handleLove = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/favourite/${props.imgUrl.substring(30)}`, {favourite: !favourite})
        .then(res => {
            if (favourite) {
                props.onFeedChange();
            }
            setFavourite(!favourite)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleClick = detail => {
        if (detail === 'who') {
            props.onSearch(who);
        } else if (detail === 'where') {
            props.onSearch(where);
        } else if (detail === 'when') {
            props.onSearch(when);
        } else if (detail === 'what') {
            props.onSearch(what);
        }
        props.closeModal();
    }

    useEffect(() => {
        let mounted = true;
        axios.get(`http://localhost:5000/details/${props.imgUrl.substring(30)}`)
        .then(response => {
            if (mounted) {
                setWho(response.data.who);
                setWhere(response.data.location);
                setWhen(response.data.time_of_memory);
                setWhat(response.data.what);
                setFavourite(response.data.favourite);
                setLoaded(true);
            }
        })
        .catch(err => console.log(err));

        return () => mounted = false;
    })

    return (
        <div className="tagmodal-container">
            {
                loaded
                ?
                <div>
                    <div className="details">
                        <div className="w-container">
                            <div className="intro">Tagged</div>
                            <div onClick={() => handleClick('who')} value="who" className="value">{who}</div>
                        </div>
                        <div className="w-container">
                            <div className="intro">Where</div>
                            <div onClick={() => handleClick('where')} value="where" className="value">{where}</div>
                        </div>
                        <div className="w-container">
                            <div className="intro">When</div>
                            <div onClick={() => handleClick('when')} value="when" className="value">{when}</div>
                        </div>
                        <div className="w-container">
                            <div className="intro">What</div>
                            <div onClick={() => handleClick('what')} value="what" className="value">{what}</div>
                        </div>
                    </div>
                    <div className="tagmodal-btns">
                        <div className="favourite-container">
                            {
                                favourite
                                ?
                                <div className="favourites-toggle">
                                    <img src={fullheart} style={{height:'40%', width:'40%'}} onClick={handleLove} />
                                </div>
                                :
                                <div className="favourites-toggle">
                                    <img src={emptyheart} style={{height:'40%', width:'40%'}} onClick={handleLove} />
                                </div>                            }
                        </div>
                        <div className="edit-container">
                            <div className="edit-toggle">
                                <img src={edit} style={{height:'40%', width:'40%'}} onClick={props.handleEdit} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="loading">
                    <p className="loading-message">Retrieving image tags...</p>
                </div>
            }
        </div>
    );
}

export default TagModal;