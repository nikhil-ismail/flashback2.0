import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import emptyheart from './emptyheart.png';
import Upload from './upload.png';
import './Navigation.css';

const Navigation = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleChange = event => {
        if (query.length + event.target.value.length <= 50) {
            setQuery(event.target.value);
        }
    }

    const handleSearch = event => {
        if (event.key === 'Enter') {
            props.onSearch(query);
        }
    }

    return (
        <div className="nav-bar-container">
            <div className="flashback">
                <h2 className="flashback-title" onClick={props.onHome}><i>Flashback</i></h2>
            </div>
            <div className="search">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                    onChange={handleChange}
                    onKeyPress={handleSearch}
                />
            </div>
            <div className="nav-buttons">
                <div className="upload-container">
                    <img src={Upload} id="upload" height="40%" width="60%" onClick={openModal} />
                </div>
                <Modal onFeedChange={props.onFeedChange} showModal={showModal} closeModal={closeModal} userId={props.userId} />
                <div className="favourites-container">
                    <img src={emptyheart} height="50%" width="50%" onClick={() => props.onFavourite()} />
                </div>
                <div className="signout-container">
                    <input
                        id="signout"
                        value="Sign Out"
                        type="button"
                        onClick={() => props.onSignout('signout')}
                    />
                </div>
            </div>
        </div>       
    );
}

export default Navigation;