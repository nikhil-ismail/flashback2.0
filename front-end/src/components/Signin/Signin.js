import React, {useState} from 'react';
import axios from 'axios';
import './Signin.css';

const Signin = (props) => {
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignin = (event) => {
        event.preventDefault();

        if (_email === '' || _password === '') {
            setError(true);
        } else {
            console.log(_password);
            axios.post('http://localhost:5000/account/signin', {_email, _password})
            .then(response => {
                console.log(response.data);
                if (response.data.auth) {
                    console.log('User successfully signed in');
                    setError(false);
                    localStorage.setItem("token", "Bearer " + response.data.accessToken);
                    props.onRouteChange('home');
                    props.onSuccessfulSignin();
                } else {
                    console.log('Unable to sign in user');
                    setError(true)
                    setEmail('');
                    setPassword('');
                }
            })
            .catch(err => {
                console.log('An error occurred signing in');
                console.log(err);
                setError(true);
                setEmail('');
                setPassword('');
            })
        }
    }

    return (
        <div className="signin">
            <div className="signin-form-card-left">
                <div className="register-form-body">
                    <form>
                        <h1>Welcome Back</h1>
                        {
                            error &&
                            <p id="error">Invalid email or password</p>
                        }
                        <input
                            type="text"
                            placeholder="Email"
                            value={_email}
                            name="email"
                            required
                            className="signin-form-input"
                            onChange={onEmailChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={_password}
                            name="password"
                            required
                            className="signin-form-input"
                            onChange={onPasswordChange}
                        />
                        <button
                            variant="primary"
                            type="submit"
                            className="signin-form-button"
                            onClick={handleSignin}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <div className="signin-form-card-right">
                <h1 className="flashback"><i>Flashback</i></h1>
                <br />
                <h5>Upload and store your photos.</h5>
                <h5>Search memories using natural language.</h5>
                <br />
                <h5 className="signin-link">Don't have an account?</h5>
                <button
                    variant="primary"
                    type="submit"
                    className="signin-form-register"
                    onClick={() => props.onRouteChange('register')}
                    >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Signin;