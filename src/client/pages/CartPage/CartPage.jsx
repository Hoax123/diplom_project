import styles from './CartPage.module.css'
import {Button} from "../../components/Button/Button.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductFromCart} from "../../redux/Slices/cart/cartSlice.jsx";


export function CartPage() {
    const mockCart = useSelector(state => state.cart.cartList)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    const dispatch = useDispatch();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Корзина</h1>

            <div className={styles.layout}>

                <div className={styles.items}>
                    {mockCart.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <Link to={`/products/${item.id}`} className={styles.navLink}>
                                        <div className={styles.itemHeader}>{item.name}</div>
                                    </Link>

                                    <div className={styles.infoLine}>
                                        <span><b>id:</b> {item.id}</span>
                                        <span><b>Количество:</b> {item.quantity}</span>
                                        <span><b>Стоимость экземпляра:</b> {item.price} ₽</span>
                                        <span><b>Общая стоимость:</b> {item.price * item.quantity} ₽</span>
                                    </div>
                                </div>

                                <Button width="180px" height="40px" onClick={() => dispatch(deleteProductFromCart(item.id))}>
                                    Удалить товар
                                </Button>

                            </div>

                            <div className={styles.itemImageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryTitle}>Итого: {totalAmount} рублей</div>
                    <Button width="220px" height="45px">Оформить заказ</Button>
                </div>

            </div>
        </div>
    )
}