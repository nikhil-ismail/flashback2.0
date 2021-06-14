import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Modal.css';

const Modal = (props) => {
    const [files, setFiles] = useState([]);
    const [fileNumber, setFileNumber] = useState(0);
    const [who, setWho] = useState('');
    const [where, setWhere] = useState('');
    const [when, setWhen] = useState('');
    const [what, setWhat] = useState('');
    const [error, setError] = useState(null);

    const FILE_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg'
    }

    const handleFileInput = (event) => {
        event.preventDefault();
        let validFiles = true;
        for (let i = 0; i < event.target.files.length; i++) {
            if (FILE_TYPE_MAP[event.target.files[i].type] === undefined) {
                validFiles = false;
                break;
            }
        }

        if (validFiles) {
            setFiles(event.target.files);
            setError('');
        } else {
            setError('You have selected an invalid file type. Please select a png, jpeg, or jpg file.')
        }
    }

    const handleMultipleImagesRightClick = () => {
        setFileNumber(fileNumber + 1);
    }

    const handleMultipleImagesLeftClick = () => {
        setFileNumber(fileNumber - 1);
    }

    const handleDetails = event => {
        const { name } = event.target;
        const { value } = event.target;

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
        setFiles('');
        setWho('');
        setWhere('');
        setWhen('');
        setWhat('');
        setError(null);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        if (files.length === 0) {
            setError('No photo was selected.')
        } else if (who.length === 0 && where.length === 0 && when.length === 0 && what.length === 0) {
            setError(`Please describe ${files.length === 1 ? 'this photo' : 'these photos'}. A description is required for ${files.length === 1 ? 'it' : 'them'} to be searchable.`)
        } else {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                data.append('photos', files[i]);
            }
            data.append('who', who);
            data.append('where', where);
            data.append('when', when);
            data.append('what', what);
            axios.post('http://localhost:5000/photos', data, { headers: { 'authorization': localStorage.getItem("token") } })
                .then(res => {
                    if (res.statusText === "OK") {
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
    }

    const closeModal = () => {
        resetFields();
        props.closeModal()
    }

    return (
        <div className="modal">
            <div className="modal-card">
                <form>
                    <div className="close-modal-button-container" onClick={closeModal}>
                        <p>X</p>
                    </div>
                    {
                        files.length === 0
                            ?
                            <div className="image-placeholder" />
                            :
                            (
                                files.length === 1
                                    ?
                                    <img
                                        src={URL.createObjectURL(files[0])}
                                        alt={`Upload`}
                                        className="uploaded-image"
                                    />
                                    :
                                    <div>
                                        {
                                            fileNumber > 0 &&
                                            <div
                                                className="multiple-images-arrow-left"
                                                onClick={handleMultipleImagesLeftClick}
                                            >
                                                <FontAwesomeIcon icon={faChevronLeft} size="sm" color="black" />
                                            </div>
                                        }
                                        <img
                                            src={URL.createObjectURL(files[fileNumber])}
                                            className="uploaded-image"
                                            alt={`Upload`}
                                        />
                                        {
                                            fileNumber < files.length - 1 &&
                                            <div
                                                className="multiple-images-arrow-right"
                                                onClick={handleMultipleImagesRightClick}
                                            >
                                                <FontAwesomeIcon icon={faChevronRight} size="sm" color="black" />
                                            </div>
                                        }
                                    </div>
                            )
                    }
                    <input
                        type="file"
                        multiple
                        id="file"
                        className="file"
                        name="file"
                        onChange={handleFileInput}
                    />
                    <label
                        className="upload-label"
                        htmlFor="file"
                        value="Upload an Image"
                    >
                        Select Photo(s)
                            </label>
                    <div className="detail-inputs">
                        <input className="file-details" type="text" placeholder="Who" name="who" onChange={handleDetails} />
                        <input className="file-details" type="text" placeholder="Where" name="where" onChange={handleDetails} />
                    </div>
                    <div className="detail-inputs">
                        <input className="file-details" type="date" placeholder="When" name="when" onChange={handleDetails} />
                        <input className="file-details" type="text" placeholder="What" name="what" onChange={handleDetails} />
                    </div>
                    {
                        error && 
                        <p className="error">{error}</p>
                    }
                    <button className="submit" onClick={handleFormSubmit}>Add Memory</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;