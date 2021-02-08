import React, { useState } from 'react';
import axios from 'axios';
import { TiStar } from "react-icons/ti";
import Modal from '../Modal/Modal';
import emptyheart from './emptyheart.png';
import Upload from './upload.png';
import './Navigation.css';

const Navigation = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleChange = event => {
        if (query.length + event.target.value.length <= 50) {
            setQuery(event.target.value);
        } else {
            setError('Please limit your search to 50 characters');
        }
    }

    const handleSearch = event => {
        if (event.key === 'Enter') {
            axios.get(`http://localhost:5000/search/${props.userId}?search=${query}`, { params: {query: query} })
            .then(response => {
                console.log(response.data);
                props.onSearch(response.data)
                props.onRouteChange('search')
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="nav-bar-container">
                <div className="nav-bar">
                    <div className="flashback">
                        <h2 className="flashback-title" onClick={() => props.onRouteChange('home')}><i>Flashback</i></h2>
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
                        <Modal showModal={showModal} closeModal={closeModal} userId={props.userId} />
                        <div className="favourites-container">
                            <img src={emptyheart} id="favourites" height="50%" width="50%" onClick={() => props.onRouteChange('favourites')} />
                        </div>
                        <div className="signout-container">
                            <input
                                id="signout"
                                value="Sign Out"
                                type="button"
                                onClick={() => props.onRouteChange('signout')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default Navigation;