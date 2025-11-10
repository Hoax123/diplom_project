import styles from "./mainScreen.module.css";
import {Button} from "../../../components/Button/Button.jsx";

export function MainScreen() {

    function scrollToProducts() {
        const element = document.querySelector("#products");
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <section className={styles.hero}>
            <div className={styles.left}>
                <div className={styles.leftInner}>
                    <p className={styles.subtitle}>Новый Сезон</p>
                    <h1 className={styles.title}>Осень 2025</h1>

                    <Button width='250px' height='60px' onClick={scrollToProducts}>Смотреть товары</Button>

                </div>
            </div>

            <div className={styles.right}>
                <img
                    src="https://cdn-sh1.vigbo.com/shops/199204/products/24024658/images/3-5f42f0e9682f837a39e32dad68fca3a4.JPG?version=undefined"
                    alt="Новая коллекция"
                    className={styles.image}
                />
            </div>
        </section>
    )
}