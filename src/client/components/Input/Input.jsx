import styles from "./Input.module.css";

export function Input({value, onChange, name, type='text', placeholder='', width, height, fontSize}) {
    return <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        style={{width, height, fontSize}}
        placeholder={placeholder}></input>
}