import styles from "./Loader.module.css"

export function Loader({message = "Загрузка", size = 60}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner} style={{width: size, height: size}}></div>
            <p className={styles.text}>{message}</p>
        </div>
    )
}