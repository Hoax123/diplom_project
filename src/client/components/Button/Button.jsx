import styles from './Button.module.css'

export function Button({ children, width, height, onClick, type='button' }) {
    return (
        <button onClick={onClick}
                style={{ width, height}}
                className={`${styles.button}`}
                type={type}>
            {children}
        </button>
    )
}