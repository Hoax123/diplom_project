import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from "./BreedCrumbs.module.css";

export function BreedCrumbs() {
    const location = useLocation()
    const path = location.pathname.replace(/^\/|\/$/g, "")

    const products = useSelector(state => state.products.list)

    if (!path) return null

    let pageName = 'страница'

    if (path === 'cart') pageName = 'Корзина';
    else if (path === 'admin') pageName = 'админ-панель';
    else if (path === 'login') pageName = 'Вход'
    else if (path === 'register') pageName = 'Регистрация'

    else if (path.startsWith('products/')) {
        const id = path.split('/')[1]
        const product = products.find((p) => p._id === id)

        pageName = product ? `Товар ${product.name}` : "Товар"
    }

    return (
        <div className={styles.breadcrumbs}>
            <Link to='/' className={styles.link}>Главная</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{pageName}</span>
        </div>
    )
}