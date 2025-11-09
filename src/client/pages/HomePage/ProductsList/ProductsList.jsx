import styles from "./productsList.module.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../../redux/Slices/products/productsSlice.jsx";
import {Loader} from "../../../components/Loader/Loader.jsx";

export function ProductsList() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("none");

    const dispatch = useDispatch();
    const {list: products, status, error} = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const result = products
        .filter(item => {
        const productName = item.name.toLowerCase();
        const query = search.toLowerCase();

        return productName.includes(query);})
        .filter(item => {
            if (category === 'all') return true;
            return item.category === category;
        })
        .sort((a, b) => {
            if (sort === 'expensive') return b.price - a.price
            if (sort === 'cheap') return a.price - b.price
            if (sort === 'stock') return b.quantity - a.quantity
        })


    if (status === 'loading') return <Loader message='Загрузка товаров...'/>;

    if (status === 'failed') return <div>Ошибка: {error}</div>



    return (
        <>
            <div className={styles.filters}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск по слову..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className={styles.selects}>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">Все категории</option>
                        <option value="верхняя одежда">Верхняя одежда</option>
                        <option value="штаны">Штаны</option>
                        <option value="рубашка">Рубашки</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className={styles.select}
                    >
                        <option value="none">Без сортировки</option>
                        <option value="expensive">Сначала дороже</option>
                        <option value="cheap">Сначала дешевле</option>
                        <option value="stock">По количеству в наличии</option>
                    </select>
                </div>
            </div>

            <div className={styles.products}>
                {result.map((product) => (
                    <div key={product._id} className={styles.card}>
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.image}
                            />
                        </Link>

                        <div className={styles.info}>
                            <div className={styles.name}>{product.name}</div>
                            <div className={styles.price}>{product.price} ₽</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
