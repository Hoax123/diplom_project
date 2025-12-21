import {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function useAuthGuard(requireRole = null) {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const prevAuthState = useRef(null);

    useEffect(() => {
        const authChanged = user !== prevAuthState.current


        if (authChanged) {
            if (!user) {
                navigate('/login', {replace: true});
            } else if (requireRole && requireRole !== user.role) {
                alert('У вас нет доступа к этой странице!')
                navigate('/', {replace: true});
            }
        }

        prevAuthState.current = user
    }, [user, requireRole, navigate]);
}