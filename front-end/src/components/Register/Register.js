import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

const Register = (props) => {
    const [_name, setName] = useState('');
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [_confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleRegister = (event) => {
        event.preventDefault();

        if (_name === '' || _email === '' || _password === '' || _confirmpassword === '') {
            setError(true);
        } else {
            axios.post('http://localhost:5000/account/register', {_name, _email, _password, _confirmpassword})
            .then(response => {
                if (response.data === 'successful') {
                    console.log("User registered successfully");
                    setError(false);
                    props.onRouteChange('signin');
                } else {
                    console.log('Email entered already exists'); 
                    setError(true);  
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                }
            }).catch(err => {
                console.log(err);
                console.log('An error occurred registering');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setError(true);
            })
        }
    }

    return (
        <div className="register">
            <div className="register-form-card-left">
                <div className="register-form-body">
                    <form>
                        <h1>Create An Account</h1>
                        {
                            error &&
                            <p id="error">Register unsuccessful. Please try again.</p>
                        }
                        <input
                            type="text"
                            placeholder="Enter full name" 
                            value={_name}
                            name="name"
                            required
                            className="register-form-input"
                            onChange={onNameChange}
                        />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={_email}
                            name="email"
                            required
                            className="register-form-input"
                            onChange={onEmailChange}
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={_password}
                            name="password"
                            required
                            className="register-form-input"
                            onChange={onPasswordChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={_confirmpassword}
                            name="cpassword"
                            required
                            className="register-form-input"
                            onChange={onConfirmPasswordChange}
                        />
                        <button
                            variant="primary"
                            type="submit"
                            className="register-form-button"
                            onClick={handleRegister}
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
            <div className="register-form-card-right">
                <h1 id="flashback"><i>Flashback</i></h1>
                <br />
                <h5>Upload and store your photos.</h5>
                <h5>Search memories using natural language.</h5>
                <br />
                <h5>Already have an account?</h5>
                <button
                    variant="primary"
                    type="submit"
                    className="register-form-signin"
                    onClick={() => props.onRouteChange('signin')}
                >
                Sign In
                </button>
            </div>
        </div>
    );
}

export default Register;