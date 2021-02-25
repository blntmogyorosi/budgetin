import jwt_decode from 'jwt-decode'

import store from './redux'
import { setAuthToken } from './utils/token'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'

if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
    const decoded = jwt_decode(localStorage.jwt);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        // window.location.href = '/';
    }
}