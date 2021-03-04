import React, {useState, useEffect} from 'react';
import axios from 'axios';
import fullheart from './fullheart.png';
import emptyheart from './emptyheart.png';
import deletePost from './delete.png';
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
        axios.put(`http://localhost:5000/favourite/${props.imgUrl.substring(30)}`, {favourite: !favourite}, { headers: { 'authorization': localStorage.getItem("token") } })
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
        axios.get(`http://localhost:5000/details/${props.imgUrl.substring(30)}`, { headers: { 'authorization': localStorage.getItem("token") } })
        .then(response => {
            setWho(response.data.who);
            setWhere(response.data.location);
            setWhen(response.data.time_of_memory);
            setWhat(response.data.what);
            setFavourite(response.data.favourite);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    })

    return (
        <div className="tagmodal-container">
            {
            loaded
            ?
            <div className="tag-body">
                <div className="tag-who-where">
                    <div className="tag-detail-wrapper">
                        <div className="tag-intro">Tagged</div>
                        <div onClick={() => handleClick('who')} value="who" className="tag-value">{who}</div>
                    </div>
                    <div className="tag-detail-wrapper">
                        <div className="tag-intro">Where</div>
                        <div onClick={() => handleClick('where')} value="where" className="tag-value">{where}</div>
                    </div>
                </div>
                <div className="tag-when-what">
                    <div className="tag-detail-wrapper">
                        <div className="tag-intro">When</div>
                        <div onClick={() => handleClick('when')} value="when" className="tag-value">{when}</div>
                    </div>
                    <div className="tag-detail-wrapper">
                        <div className="tag-intro">What</div>
                        <div onClick={() => handleClick('what')} value="what" className="tag-value">{what}</div>
                    </div>
                </div>
            </div>
            :
            <div className="loading">
                <p className="loading-message">Retrieving image tags...</p>
            </div>
            }
            <div className="tagmodal-btns">
                <div className="favourite">
                    {
                        favourite
                        ?
                        <img src={fullheart} className="favourite-icon" style={{height:'35px', width:'35px'}} onClick={handleLove} />
                        :
                        <img src={emptyheart} className="favourite-edit-icon" style={{height:'35px', width:'35px'}} onClick={handleLove} />
                    }
                </div>
                <div className="edit">
                    <img src={edit} className="favourite-edit-icon" style={{height:'30px', width:'30px'}} onClick={props.handleEdit} />
                </div>
                <img src={deletePost} className="delete" style={{height:'30px', width:'30px'}} onClick={props.onDelete} />
            </div>
        </div>
    );
}

export default TagModal;