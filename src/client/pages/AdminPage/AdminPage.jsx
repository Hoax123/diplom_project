import styles from "./adminPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, createProduct, deleteProduct, updateProduct} from "../../redux/Slices/products/productsSlice.jsx";
import {useEffect, useState} from "react";
import {Loader} from "../../components/Loader/Loader.jsx";

export function AdminPage() {
    const [productForm, setProductForm] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
    });

    const [editingId, setEditingId] = useState(null);

    const {list: products, error, status} = useSelector((state) => state.products);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    function handleChange(e) {
        const { name, value } = e.target;
        setProductForm(prev => ({...prev, [name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!productForm.name || !productForm.category) return

        if (editingId) {
            await dispatch(updateProduct({
                id: editingId,
                product: productForm,
                token
            }))
            setEditingId(null);
        } else {
            await dispatch(createProduct({
                product: productForm,
                token
            }))
        }

        setProductForm({
            id: Math.random(),
            name: "",
            category: "",
            price: "",
            quantity: "",
            image: "",
        })
    }

    function handleEditClick(product) {
        setEditingId(product._id);
        setProductForm(product)
    }

    function handleDeleteClick(id) {
        dispatch(deleteProduct({id, token}));
    }

    return (
        <div className={styles.page}>
            <div className={styles.left}>

                <h2 className={styles.title}>{editingId ? 'Изменить товар' : 'Добавить товар'}</h2>

                <form action="" onSubmit={handleSubmit} className={styles.form}>
                    <Input type="text"
                           placeholder="Наименование товара"
                           name='name' 
                           value={productForm.name}
                           onChange={handleChange} />

                    <select className={styles.input}
                            name='category'
                            value={productForm.category}
                            onChange={handleChange}
                    >
                        <option value="">Категория</option>
                        <option value="верхняя одежда">Верхняя одежда</option>
                        <option value="штаны">Штаны</option>
                        <option value="рубашка">Рубашка</option>
                    </select>

                    <Input type="text"
                           placeholder="Количество товара"
                           name='quantity'
                           value={productForm.quantity}
                           onChange={handleChange} />
                    <Input type="text"
                           placeholder="Стоимость товара"
                           name='price' value={productForm.price}
                           onChange={handleChange} />
                    <Input type="text"
                           placeholder="URL фото"
                           name='image'
                           value={productForm.image}
                           onChange={handleChange} />

                    <Button width="100%" height="42px" type='submit'>{editingId ? 'Сохранить изменения' : 'Добавить товар'}</Button>

                    {error && <div style={{ color: "red", marginTop: "10px" }}>Ошибка - {error}</div>}
                </form>

            </div>

            <div className={styles.right}>
                {status === "loading" && <Loader message='Загрузка товаров...'/>}

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Категория</th>
                        <th>Стоимость</th>
                        <th>Кол-во</th>
                        <th>Фото (URL)</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p._id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>{p.price} ₽</td>
                            <td>{p.quantity}</td>
                            <td>
                                <div className={styles.urlCell}>{p.image}</div>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <Button width='100%'
                                            height='32px'
                                            onClick={() => handleEditClick(p)}>Изменить</Button>
                                    <Button width='100%'
                                            height='32px'
                                            onClick={() => handleDeleteClick(p._id)}>Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
