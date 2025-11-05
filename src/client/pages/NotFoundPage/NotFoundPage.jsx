import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
    return (
        <div className={styles.page}>
            <div className={styles.code}>404</div>

            <div className={styles.textBlock}>
                <div className={styles.text}>Все пропало! (шутка)</div>
                <Link to="/" className={styles.link}>
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
