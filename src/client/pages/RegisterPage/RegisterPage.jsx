import styles from "./RegisterPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/Slices/auth/authSlice.jsx";

export function RegisterPage() {
    const [userData, setUserData] = useState({
        login: "",
        password: "",
    });

    const dispatch = useDispatch();
    const {status, error} = useSelector((state) => state.auth);

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});

        console.log(userData)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!userData.login || !userData.password) return

        dispatch(registerUser(userData));
    }


    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Регистрация</h2>

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

                <Button width='100%' height='60px' type='submit'>{status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}</Button>

                {error && <div style={{color: "red"}}>Ошибка - {error}</div>}
            </form>
        </div>
    )
}