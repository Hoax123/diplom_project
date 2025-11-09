import { useParams } from "react-router-dom";
import { products } from "../../db.js";
import styles from "./productPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {addProductToCart} from "../../redux/Slices/cart/cartSlice.jsx";
import {useDispatch, useSelector} from "react-redux";

export function ProductPage() {
    const { id } = useParams();
    const products = useSelector((state) => state.products.list);

    const product = products.find(item => item._id === id);

    const dispatch = useDispatch();

    if (!product) {
        return <div className={styles.notFound}>Товар не найден</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.breadcrumbs}>типо хлебные крошки</div>

            <div className={styles.content}>

                <div className={styles.imageBlock}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                </div>

                <div className={styles.divider}></div>

                <div className={styles.infoBlock}>

                    <div className={styles.textGroup}>
                        <div className={styles.item}>
                            <span className={styles.label}>Наименование</span>
                            <span className={styles.value}>{product.name}</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Количество</span>
                            <span className={styles.value}>{product.quantity}</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Стоимость</span>
                            <span className={styles.value}>{product.price} ₽</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Id товара</span>
                            <span className={styles.value}>{product.id}</span>
                        </div>

                    </div>

                    <Button width='100%' height='60px' onClick={() => dispatch(addProductToCart(product))}>В корзину</Button>
                </div>
            </div>
        </div>
    );
}
