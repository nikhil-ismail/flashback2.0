import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

import Modal from '../Modal/Modal';
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
        setQuery('');
    }

    return (
        <div className="nav-bar-container">
            <div className="logo-container">
                <div className="logo" onClick={() => props.onHome()}><i>Flashback</i></div>
            </div>
            <div className="search-upload">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                    onChange={handleChange}
                    onKeyPress={handleSearch}
                />
                <div className="upload-container" onClick={openModal}>
                    <FontAwesomeIcon icon={faCloudUploadAlt} size="lg" className="delete" />
                </div>
            </div>
            {
                showModal &&
                <Modal onFeedChange={props.onFeedChange} closeModal={closeModal} />
            }
        </div>       
    );
}

export default Navigation;