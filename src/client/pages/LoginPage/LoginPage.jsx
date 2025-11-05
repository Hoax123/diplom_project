import {Link} from "react-router-dom";
import styles from "./LoginPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";

export function LoginPage() {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Вход</h2>

            <form action="" className={styles.form}>
                <Input type="text" placeholder='Логин...' width='100%' height='60px'fontSize='17px'/>
                <Input type="text" placeholder='пароль...' width='100%' height='60px' fontSize='17px'/>

                <Button width='100%' height='60px'>Войти</Button>

                <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
            </form>
        </div>
    )
}