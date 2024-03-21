import axios from 'axios';

const initialState = {
    loggedIn: null,
    user: null,
    modal: 'none'
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'login':
            return {...state, user: action.payload, loggedIn: true}
        case 'logout':
            return {...state, user: null, loggedIn: false}
        case 'modal-on':
            return {...state, modal: 'flex'}
        case 'modal-off':
            return {...state, modal: 'none'}
        default:
            return state;
    };
};