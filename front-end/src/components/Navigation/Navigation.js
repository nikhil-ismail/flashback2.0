import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './Navigation.css';

const Navigation = (props) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <div className="nav-bar-container">
                <div className="nav-bar">
                <h2 className="flashback" onClick={() => props.onRouteChange('home')}>Flashback</h2>
                    <div className="search-upload">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search"
                        />
                        <input
                            type="button"
                            value="Upload Memory"
                            className="upload"
                            onClick={openModal}
                        />
                        <input
                            type="button"
                            value="Favourites"
                            className="upload"
                            onClick={() => props.onRouteChange('favourites')}
                        />
                        <Modal showModal={showModal} closeModal={closeModal} userId={props.userId} />
                    </div>
                </div>
                <p id="signout" onClick={() => props.onRouteChange('signout')}>Sign Out</p>
            </div>
        </div>
       
    );
}

export default Navigation;