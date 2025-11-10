import {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function useAuthGuard(requireRoll = null) {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        } else if (requireRoll && requireRoll !== user.role) {
            alert('У вас нет доступа к этой странице!')
            navigate('/');
        }
    }, [user, token, requireRoll, navigate]);
}