import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/auth';

function Logout() {
    const nagivate = useNavigate();

    useEffect(() => {
        authService.logout()
            .then(() => {
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('userId');
                nagivate('/');
            })
            .catch((err) => console.error(err));
    }, []);
}

export default Logout;