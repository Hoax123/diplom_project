import styles from './CartPage.module.css'
import {Button} from "../../components/Button/Button.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "../../redux/Slices/cart/cartSlice.jsx";


export function CartPage() {
    const items = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Корзина</h1>

            <div className={styles.layout}>
                <div className={styles.items}>
                    {items.map((item) => {
                        const prod = typeof item.productId === "object" ? item.productId : null;
                        const id = prod ? prod._id : item.productId;

                        return (
                            <div key={id} className={styles.item}>
                                <div className={styles.itemInfo}>
                                    <div>
                                        {prod ? (
                                            <Link to={`/products/${id}`} className={styles.navLink}>
                                                <div className={styles.itemHeader}>{prod.name}</div>
                                            </Link>
                                        ) : (
                                            <div className={styles.itemHeader}>Товар</div>
                                        )}

                                        <div className={styles.infoLine}>
                                            <span><b>id:</b> {id}</span>
                                            <span><b>Количество:</b> {item.quantity}</span>
                                            <span><b>Цена:</b> {prod ? prod.price : 0} ₽</span>
                                            <span><b>Сумма:</b> {prod ? prod.price * item.quantity : 0} ₽</span>
                                        </div>
                                    </div>

                                    <Button
                                        width="180px"
                                        height="40px"
                                        onClick={() =>
                                            dispatch(removeFromCart({ token, productId: id }))
                                        }
                                    >
                                        Удалить товар
                                    </Button>
                                </div>

                                {prod && (
                                    <div className={styles.itemImageWrapper}>
                                        <img src={prod.image} alt={prod.name} className={styles.itemImage} />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {items.length === 0 && <div>Корзина пуста</div>}
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryTitle}>Итого: {total} ₽</div>
                    <Button width="220px" height="45px">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    )
}