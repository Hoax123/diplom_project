import styles from "./adminPage.module.css";
import {Button} from "../../components/Button/Button.jsx";
import {Input} from "../../components/Input/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productAdd, productDelete, productUpdate} from "../../redux/Slices/products/productsSlice.jsx";
import {useState} from "react";

export function AdminPage() {
    const [productForm, setProductForm] = useState({
        id: Math.random(),
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
    });

    const [editingId, setEditingId] = useState(null);

    const products = useSelector(state => state.products.list)
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setProductForm(prev => ({...prev, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(productForm);

        if (editingId) {
            dispatch(productUpdate(productForm))
            setEditingId(null);
        } else {
            dispatch(productAdd(productForm))
        }

        console.log('успешно');

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
        setEditingId(product.id);
        setProductForm(product)
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
                </form>

            </div>

            <div className={styles.right}>
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
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>{p.price} ₽</td>
                            <td>{p.quantity}</td>
                            <td>
                                <div className={styles.urlCell}>{p.image}</div>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <Button width='100%' height='32px' onClick={() => handleEditClick(p)}>Изменить</Button>
                                    <Button width='100%' height='32px' onClick={() => dispatch(productDelete(p.id))}>Удалить</Button>
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
