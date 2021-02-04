import React, {useState} from 'react';
import './Register.css';
import Typing from 'react-typing-animation';

const Register = (props) => {
    const [_username, setUsername] = useState('');
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [_confirmpassword, setConfirmPassword] = useState('');

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
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            console.log(err);
            console.log('An error occurred registering');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    const AnimatedTypingComponent = () => (
        <Typing>
        <div>
          <h5>Upload and store your photos and albums.</h5>
        </div>
      </Typing>
    );

      const AnimatedTypingComponentTwo = () => (
        <Typing>
        <div>
          <Typing.Delay ms={4000} />
          <h5>Search memories using natural language.</h5>
        </div>
      </Typing>
    );

    return (
        <div className="register">
                <div className="register-form-card-left">
                    <h1>Create An Account</h1>
                    <form>
                        <div className="register-form-body">
                            <input
                                type="text"
                                placeholder="Enter a username" 
                                value={_username}
                                name="username"
                                required
                                className="register-form-input"
                                onChange={onUsernameChange}
                            />
                            <input
                                type="email"
                                placeholder="Enter an email"
                                value={_email}
                                name="email"
                                required
                                className="register-form-input"
                                onChange={onEmailChange}
                            />
                            <input
                                type="password"
                                placeholder="Enter a Password"
                                value={_password}
                                name="password"
                                required
                                className="register-form-input"
                                onChange={onPasswordChange}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Your Password"
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
                            <p
                                className="register-link"
                                onClick={() => props.onRouteChange('signin')}
                            >
                                <div className="click">Already have an account? Sign In</div>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="register-form-card-right">
                    <h1><div id="flashback">Flashback</div></h1>
                    <br />
                    <AnimatedTypingComponent />
                    <AnimatedTypingComponentTwo />
                    <br />
                    <br />
                    <div className="google">
                        Sign up with Google
                    </div>
                    <br />
                    <div className="facebook">
                        Sign up with Facebook
                    </div>
                    <br />
                    <div className="apple">
                        Sign up with Apple
                    </div>
                </div>
        </div>
    );
}

export default Register;