import {Link, useNavigate} from "react-router-dom";
import styles from "./LoginPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/Slices/auth/authSlice.jsx";
import {fetchCart} from "../../redux/Slices/cart/cartSlice.jsx";

export function LoginPage() {
    const [userData, setUserData] = useState({
        login: '',
        password: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error, token} = useSelector((state) => state.auth);


    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const resultAction = await dispatch(loginUser(userData));

        if (loginUser.fulfilled.match(resultAction)) {
            const token = resultAction.payload.token;
            dispatch(fetchCart({token}));
            navigate("/");
        }
    }


    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Вход</h2>

            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <Input type="text"
                       placeholder='Логин...'
                       width='100%'
                       height='60px'
                       fontSize='17px'
                       value={userData.login}
                       onChange={handleChange}
                       name='login' />

                <Input type="text"
                       placeholder='пароль...'
                       width='100%' height='60px'
                       fontSize='17px'
                       value={userData.password}
                       onChange={handleChange}
                       name='password' />

                <Button width='100%' height='60px' type='submit'>{status === 'loading' ? 'Вход...' : 'Войти'}</Button>

                <Link to='/register' className={styles.link}>Зарегистрироваться</Link>

                {error && <div style={{color: "red"}}>Ошибка - {error}</div>}
            </form>
        </div>
    )
}