import {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function useAuthGuard(requireRole = null) {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const prevAuthState = useRef({user: null, token: null});

    useEffect(() => {
        const authChanged = user !== prevAuthState.current.user || token !== prevAuthState.current.token;


        if (authChanged) {
            if (!user || !token) {
                navigate('/login', {replace: true});
            } else if (requireRole && requireRole !== user.role) {
                alert('У вас нет доступа к этой странице!')
                navigate('/', {replace: true});
            }
        }

        prevAuthState.current = {user, token}
    }, [user, token, requireRole, navigate]);
}