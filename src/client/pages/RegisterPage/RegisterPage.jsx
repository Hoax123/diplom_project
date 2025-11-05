import styles from "./RegisterPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";

export function RegisterPage() {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Регистрация</h2>

            <form action="" className={styles.form}>
                <Input type="text" placeholder='Логин...' width='100%' height='60px' fontSize='17px'/>
                <Input type="text" placeholder='пароль...' width='100%' height='60px'fontSize='17px'/>

                <Button width='100%' height='60px'>Зарегистрироваться</Button>
            </form>
        </div>
    )
}