import './Header.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let loggedIn = useSelector(state => state.loggedIn);

    const openModal = () => {
        dispatch({type: 'modal-on'});
    };

    const logoutUser = async() => {
        const { data } = await axios.post('./api/auth/logout');
        if(data.success) {
            dispatch({type: 'logout'});
            navigate('/');
        };
    };

    return (
        <div className="header">
            <nav className="header-nav">
                <div className='backlight'>
                    <NavLink to="/" className="nav">Home</NavLink>
                </div>
                <i></i>
                <div className='backlight'>
                    <NavLink to="/creator/0" className="nav">Creator</NavLink>
                </div>
                <i></i>
                <div className='backlight'>
                    <NavLink to="/characters" className="nav">Characters</NavLink>
                </div>
            </nav>
            <div className="logo-div">
                <img src="/images/assets/dungeons-and-dragons-logo.png" alt="" className="logo"/>
            </div>
            <nav className='account-div'>
                {loggedIn ? <a href="#" className="login-btn">
                                <span className="login-text" onClick={logoutUser}>Logout</span><i></i>
                            </a> : <a href="#" className="login-btn">
                                <span className="login-text" onClick={openModal}>Login/Register</span><i></i>
                            </a>}
            </nav>
        </div>
    );
};

export default Header;