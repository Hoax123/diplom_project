import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../redux/Slices/cart/cartSlice.jsx";
import {Loader} from "../../components/Loader/Loader.jsx";
import {BreedCrumbs} from "../../components/Breedcrumbs/BreedCrumbs.jsx";

export function ProductPage() {
    const { id } = useParams();
    const {list: products, status, error} = useSelector((state) => state.products);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const product = products.find(item => item._id === id);

    const dispatch = useDispatch();

    async function handleAddToCart() {
        if (!user || !token) {
            alert("Чтобы добавить товар в корзину, вы должно быть авторизованы!")
            return
        }

        if(user.role !== "user") {
            alert("У вас нет прав на добавление товара в корзину!")
            return;
        }

        try {
            let result = await dispatch(addToCart({token, productId: product._id, quantity: 1}));

            if (result) {
                alert("Вы успешно добавили товар в корзину!")
            }
        } catch (error) {
            if (error.message.includes('401') || error.message.includes('403')) {
                alert('Ошибка авторизации')
            } else if (error.message.includes('404')) {
                alert("Товар не найден")
            } else {
                alert(`Не удалось добавить товар в корзину: ${error.message}`)
            }
        }
    }

    if (!product) {
        return <div className={styles.notFound}>Товар не найден</div>;
    }

    if (status === 'loading') return <Loader message='Загрузка товара...'/>;
    if (error) return <div> Ошибка загрузки - {error}</div>

    return (
        <div className={styles.page}>

            <BreedCrumbs/>

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
                            <span className={styles.value}>{product._id}</span>
                        </div>

                    </div>

                    <Button width='100%' height='60px' onClick={handleAddToCart}>В корзину</Button>
                </div>
            </div>
        </div>
    );
}
