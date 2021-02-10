import React from 'react';
import emptyheart from './emptyheart.png';
import recent from './recent.png';
import memorylane from './memory-lane.png';
import './Sidebar.css';

const Sidebar = (props) => {
    return (
        <div className="sidebar-container">
                {
                    props.currentPage === 'home'
                    ?
                    (
                        <div>
                            <div className="sidebar-item-current" onClick={() => props.onHome()}>
                                <img className="icon" src={recent} alt="icon" />
                                <div>Most Recent</div>
                            </div>
                            <div className="sidebar-item" onClick={() => props.onFavourite()}>
                                <img className="icon" src={emptyheart} alt="icon" />
                                <div>Favourites</div>
                            </div>
                            <div className="sidebar-item" onClick={() => props.onMemoryLane()}>
                                <img className="icon" src={memorylane} alt="icon" />
                                <div>Memory Lane</div>
                            </div>
                        </div>
                    )
                    :
                    (
                        props.currentPage === 'favourites'
                        ?
                        (
                            <div>
                                <div className="sidebar-item" onClick={() => props.onHome()}>
                                    <img className="icon" src={recent} alt="icon" />
                                    <div>Most Recent</div>
                                </div>
                                <div className="sidebar-item-current" onClick={() => props.onFavourite()}>
                                    <img className="icon" src={emptyheart} alt="icon" />
                                    <div>Favourites</div>
                                </div>
                                <div className="sidebar-item" onClick={() => props.onMemoryLane()}>
                                    <img className="icon" src={memorylane} alt="icon" />
                                    <div>Memory Lane</div>
                                </div>
                            </div>
                        )
                        :
                        (
                            props.currentPage === 'random'
                            ?
                            <div>
                                <div className="sidebar-item" onClick={() => props.onHome()}>
                                    <img className="icon" src={recent} alt="icon" />
                                    <div>Most Recent</div>
                                </div>
                                <div className="sidebar-item" onClick={() => props.onFavourite()}>
                                    <img className="icon" src={emptyheart} alt="icon" />
                                    <div>Favourites</div>
                                </div>
                                <div className="sidebar-item-current" onClick={() => props.onMemoryLane()}>
                                    <img className="icon" src={memorylane} alt="icon" />
                                    <div>Memory Lane</div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="sidebar-item" onClick={() => props.onHome()}>
                                    <img className="icon" src={recent} alt="icon" />
                                    <div>Most Recent</div>
                                </div>
                                <div className="sidebar-item" onClick={() => props.onFavourite()}>
                                    <img className="icon" src={emptyheart} alt="icon" />
                                    <div>Favourites</div>
                                </div>
                                <div className="sidebar-item" onClick={() => props.onMemoryLane()}>
                                    <img className="icon" src={memorylane} alt="icon" />
                                    <div>Memory Lane</div>
                                </div>
                            </div>
                        )

                    )
                }
            <input
                className="signout"
                type="button"
                value="Sign Out"
                onClick={() => props.onSignout('signout')}
            />
        </div>
    );
}

export default Sidebar;