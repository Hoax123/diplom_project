import {Link} from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
    const isAuthenticaded = false
    const user = {name: "Ivan"}

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.leftSection}>
                    <Link to='/' className={styles.logoLink}>Главная</Link>
                </div>

                <div className={styles.rightSection}>
                    {isAuthenticaded ? (
                        <div className={styles.authSection}>

                            <div className={styles.userInfo}>
                                Добро пожаловать, {user?.name}
                            </div>

                            <div className={styles.navLinks}>
                                <Link to='/admin' className={styles.navLink}>Админ-панель</Link>
                                <Link to='/cart' className={styles.navLink}>Корзина</Link>
                                <Link to='/' className={styles.navLink}>Выйти</Link>
                            </div>

                        </div>
                    ) : (
                        <div className={styles.guestSection}>
                            <Link to='/login' className={styles.navLink}>Войти</Link>
                            <Link to='/register' className={styles.registerLink}>Зарегистрироваться</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}