import React, {useState} from 'react';
import './Register.css';

const Register = (props) => {
    const [_name, setName] = useState('');
    const [_username, setUsername] = useState('');
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [_confirmpassword, setConfirmPassword] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
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

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: _name,
                    username: _username,
                    email: _email,
                    password: _password,
                    confirmpassword: _confirmpassword
                })
            });

            if (response.ok) {
                console.log("User registered successfully");
                props.onRouteChange('signin');
            } else {
                console.log('Email entered already exists');   
                setName('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            console.log(err);
            console.log('An error occurred registering');
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    return (
        <div className="register">
                <div className="register-form-card-left">
                    <h1>Create An Account</h1>
                    <form>
                        <div className="register-form-body">
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
                                type="text"
                                placeholder="Enter username" 
                                value={_username}
                                name="username"
                                required
                                className="register-form-input"
                                onChange={onUsernameChange}
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
                        </div>
                    </form>
                </div>
                <div className="register-form-card-right">
                    <h1><div className="flashback">Flashback</div></h1>
                    <br />
                    <h5>Upload and store your photos.</h5>
                    <h5>Search memories using natural language.</h5>
                    <br />
                    <h5 className="register-link">Already have an account?</h5>
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