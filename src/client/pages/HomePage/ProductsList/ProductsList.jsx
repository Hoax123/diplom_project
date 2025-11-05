import styles from "./productsList.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";

export function ProductsList() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("none");

    const products = useSelector(state => state.products.list);

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
                    <div key={product.id} className={styles.card}>
                        <Link to={`/products/${product.id}`}>
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
