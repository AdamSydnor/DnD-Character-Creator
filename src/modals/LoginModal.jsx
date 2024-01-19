import './LoginModal.css';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modal = useSelector(state => state.modal);

    const [logUser, setLogUser] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const [regUser, setRegUser] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const loginUser = async() => {
        if(logUser && logPassword) {
            const { data } = await axios.post('/api/auth/login', {
                username: logUser,
                password: logPassword
            });

            if(data.success) {
                dispatch({ type: 'login', payload: data.user });
                dispatch({ type: 'modal-off' });
                navigate('/');
            } else {
                alert('Invalid data!');
            };
        } else {
            alert('Both username and password are needed to login.');
        };
    };

    const registerUser = async() => {
        if(regUser && regPassword) {
            const { data } = await axios.post('/api/auth/register', {
                username: regUser,
                password: regPassword
            });

            if(data.success) {
                dispatch({ type: 'login', payload: data.user });
                dispatch({ type: 'modal-off' });
                navigate('/');
            } else {
                alert('Invalid data!');
            };
        } else {
            alert('Both User and password are needed to register.');
        };
    };

    const handleOverlayClose = (event) => {
        console.log(event.target.classList.contains('modal'))
        if (event.target.classList.contains('modal')) {
            dispatch({ type: 'modal-off' });
        };
    };

    return (
        <div style={{display: modal}} id='modal' className='modal' onClick={handleOverlayClose}>
            <main id="forms">
                <section className="form">
                    <h1 className='modal-title'>Login:</h1>
                    <label htmlFor="log-User" className='modal-label'>Username</label>
                    <input
                        className='input'
                        name="log-User"
                        placeholder="Enter your User..."
                        onChange={(e) => setLogUser(e.target.value)}
                    />
                    <label htmlFor="log-password" className='modal-label'>Password</label>
                    <input
                        className='input'
                        type="password"
                        name="log-password"
                        placeholder="Enter a password..."
                        onChange={(e) => setLogPassword(e.target.value)}
                    />
                    <a href="#" className="modal-btn" onClick={loginUser}>
                        <span className="modal-btn-text">Login</span>
                        <i></i>
                    </a>
                </section>
                <section className="form">
                    <h1 id="register-title" className='modal-title'>Register:</h1>
                    <label htmlFor="reg-User" className='modal-label'>Username</label>
                    <input
                        className='input'
                        type="text"
                        name="reg-User"
                        placeholder="Enter a User..."
                        onChange={(e) => setRegUser(e.target.value)}
                    />
                    <label htmlFor="reg-password" className='modal-label'>Password</label>
                    <input
                        className='input'
                        type="password"
                        name="reg-password"
                        placeholder="Enter a password..."
                        onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <a href="#" className="modal-btn" onClick={registerUser}>
                        <span className="modal-btn-text">Register</span>
                        <i></i>
                    </a>
                </section>
            </main>
        </div>
    );
};