import {Link} from "react-router-dom";
import styles from "./header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/Slices/auth/authSlice.jsx";
import {clearCart} from "../../redux/Slices/cart/cartSlice.jsx";

export function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.leftSection}>
                    <Link to='/' className={styles.logoLink}>Главная</Link>
                </div>

                <div className={styles.rightSection}>
                    {user ? (
                        <div className={styles.authSection}>

                            <div className={styles.userInfo}>
                                Добро пожаловать, {user.login}
                            </div>

                            <div className={styles.navLinks}>

                                {user?.role === 'admin' && (<Link to='/admin' className={styles.navLink}>Админ-панель</Link>)}
                                {user?.role === 'user' && (<Link to='/cart' className={styles.navLink}>Корзина</Link>)}

                                <Link to='/'
                                      className={styles.navLink}
                                      onClick={() => {
                                          dispatch(logoutUser())
                                          dispatch(clearCart())
                                      }}>Выйти</Link>
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