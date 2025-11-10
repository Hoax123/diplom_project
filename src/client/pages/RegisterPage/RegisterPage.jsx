import styles from "./RegisterPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/Slices/auth/authSlice.jsx";
import {Loader} from "../../components/Loader/Loader.jsx";
import {BreedCrumbs} from "../../components/Breedcrumbs/BreedCrumbs.jsx";

export function RegisterPage() {
    const [userData, setUserData] = useState({
        login: "",
        password: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [clientError, setClientError] = useState("");

    const dispatch = useDispatch();
    const {status, error} = useSelector((state) => state.auth);

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});

        setClientError('')
        setSuccessMessage('')
    }

    function validForm() {
        if (!userData.login || !userData.password) {
            setClientError('Заполните все поля!')
            return false;
        }

        if (userData.password.length < 6) {
            setClientError('Пароль должен быть не менее 6 симолов')
            return false;
        }

        if (userData.login.length < 3) {
            setClientError('Логин должен быть не менее 6 симолов')
            return false;
        }

        return true;
    }





    async function handleSubmit(e) {
        e.preventDefault();

        const isFormValid = validForm();

        if (!isFormValid) return

        const resultAction = await dispatch(registerUser(userData));

        if (registerUser.fulfilled.match(resultAction)) {
            setSuccessMessage('Вы успешно зарегистрировались')
        }
    }


    return (
        <div className={styles.page}>

            <BreedCrumbs/>

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

                <Button width='100%' height='60px' type='submit'>{status === 'loading' ? <Loader size='20' message=''/> : 'Зарегистрироваться'}</Button>

                {successMessage && <div style={{color: "green"}}>{successMessage}</div>}
                {clientError && <div style={{color: "red"}}>Ошибка - {clientError}</div>}
                {error && <div style={{color: "red"}}>Ошибка - {error}</div>}
            </form>
        </div>
    )
}