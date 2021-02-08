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
            setFavourite(!favourite)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/details/${props.imgUrl.substring(30)}`)
        .then(response => {
            setWho(response.data.who);
            setWhere(response.data.location);
            setWhen(response.data.time_of_memory);
            setWhat(response.data.what);
            setFavourite(response.data.favourite);
            setLoaded(true);
            console.log(`${who}, ${what}, ${where}, ${when}, ${favourite}`);
        })
        .catch(err => console.log(err));
    })

    return (
        <div className="tagmodal-container">
            {
                loaded
                ?
                <div>
                    <div className="details">
                        <div className="w-container">
                            <span className="intro" onClick={alert('click')}>Tagged</span>
                            <span className="value">{who}</span>
                        </div>
                        <div className="w-container">
                            <span className="intro">Where</span>
                            <span className="value">{where}</span>
                        </div>
                        <div className="w-container">
                            <span className="intro">When</span>
                            <span className="value">{when}</span>
                        </div>
                        <div className="w-container">
                            <span className="intro">What</span>
                            <span className="value">{what}</span>
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