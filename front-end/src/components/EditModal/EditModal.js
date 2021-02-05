import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './EditModal.css';

const EditModal = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [who, setWho] = useState(props.who);
    const [where, setWhere] = useState(props.where);
    const [when, setWhen] = useState(props.when);
    const [what, setWhat] = useState(props.what);

    const imgUrl = props.imgUrl;

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

    const handleFormSubmit = event => {
        event.preventDefault();
        axios.put('http://localhost:5000/edit', { who, what, where, when, imgUrl })
        .then(res => {
            props.closeEdit();
            props.refreshDetails({
                who: who,
                location: where,
                time_of_memory: when,
                what: what
            })
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleCancel = event => {
        event.preventDefault();
        props.closeEdit();
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/details/${props.imgUrl.substring(30)}`)
        .then(response => {
            setWho(response.data.who);
            setWhere(response.data.location);
            setWhen(response.data.time_of_memory);
            setWhat(response.data.what);
            setLoaded(true);
            console.log(`${who}, ${what}, ${where}, ${when}`);
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="editmodal-container">
            {
                loaded
                ?
                <div>
                    <div className="details">
                        <div className="w-container">
                                <span className="intro">Tagged</span>
                                <input type="text" placeholder={who} className="value" name="who" onChange={handleDetails} />
                        </div>
                        <div className="w-container">
                                <span className="intro">Where</span>
                                <input type="text" placeholder={where} className="value" name="where" onChange={handleDetails} />
                        </div>
                        <div className="w-container">
                                <span className="intro">When</span>
                                <input type="text" placeholder={when} className="value" name="when" onChange={handleDetails} />
                        </div>
                        <div className="w-container">
                                <span className="intro">What</span>
                                <input type="text" placeholder={what} className="value" name="what" onChange={handleDetails} />
                        </div>
                    </div>
                    <div className="tagmodal-btns">
                        <div>
                            <button className="edit-btn" onClick={handleCancel}>Cancel</button>
                            <button className="edit-btn" onClick={handleFormSubmit}>Confirm</button>
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

export default EditModal;