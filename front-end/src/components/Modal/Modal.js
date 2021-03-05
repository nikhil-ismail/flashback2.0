import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = (props) => {
    const [file, setFile] = useState('Choose File')
    const [fileSelected, setFileSelected] = useState(false);
    const [who, setWho] = useState('');
    const [where, setWhere] = useState('');
    const [when, setWhen] = useState('');
    const [what, setWhat] = useState('');
    const [error, setError] = useState(null);

    const handleFileInput = event => {
        event.preventDefault();
        setFile(event.target.files[0]);
        setFileSelected(true)
    }

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

    const resetFields = () => {
        setFile('');
        setFileSelected(false);
        setWho('');
        setWhere('');
        setWhen('');
        setWhat('');
        setError(null);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', file);
        data.append('who', who);
        data.append('where', where);
        data.append('when', when);
        data.append('what', what);
        if (fileSelected) {
            axios.post('http://localhost:5000/post', data, { headers: { 'authorization': localStorage.getItem("token") } })
            .then(res => {
                if (res.statusText === "OK") {
                    setFileSelected(false);
                    resetFields();
                    props.closeModal();
                    props.onFeedChange();
                } else {
                    setError('Error uploading image. Please make sure you are uploading an image file.')
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            setError("Please select an image.");
        }
    }

    const closeModal = event => {
        resetFields();
        props.closeModal()
    }

    if (props.showModal) {
        return (
            <div className="modal">
                <div className="modal-card">
                    <form>
                        <input type="file" id="file" className="file" name="file" onChange={handleFileInput} />
                        <label className="upload-label" htmlFor="file" value="Upload an Image">Upload an Image</label>
                        <div>
                            {
                                fileSelected
                                ?
                                <p>{file.name}</p>
                                :
                                <p id="no-file">File Not Selected</p>
                            }
                        </div>
                        <div className="detail-inputs">
                            <input className="file-details" type="text" placeholder="Who" name="who" onChange={handleDetails} />
                            <input className="file-details" type="text" placeholder="Where" name="where" onChange={handleDetails} />
                        </div>
                        <div className="detail-inputs">
                            <input className="file-details" type="date" placeholder="When" name="when" onChange={handleDetails} />
                            <input className="file-details" type="text" placeholder="What" name="what" onChange={handleDetails} />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button className="submit" onClick={handleFormSubmit}>Add Memory</button>
                    </form>
                    <input
                        type="button"
                        value="Close"
                        className="close-upload-modal"
                        onClick={closeModal}
                    />
                </div>
            </div>
        );
    }
    return null;
};

export default Modal;