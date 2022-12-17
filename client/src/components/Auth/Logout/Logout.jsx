import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/authContext';
import * as authService from '../../../services/auth';

function Logout() {
    const { userLogout } = useContext(AuthContext);
    const nagivate = useNavigate();

    useEffect(() => {
        authService.logout()
            .then(() => {
                userLogout();
                nagivate('/');
            })
            .catch((err) => console.error(err));
    }, []);
}

export default Logout;