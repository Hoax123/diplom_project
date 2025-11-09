import {Header} from "./client/components/header/header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RegisterPage} from "./client/pages/index.js";
import {ProductPage} from "./client/pages/ProductPage/ProductPage.jsx";
import {NotFoundPage} from "./client/pages/NotFoundPage/NotFoundPage.jsx";
import {CartPage} from "./client/pages/CartPage/CartPage.jsx";
import {AdminPage} from "./client/pages/AdminPage/AdminPage.jsx";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./client/redux/store.jsx";
import {RequireRole} from "./client/components/requireRole/requireRole.jsx";
import {useEffect} from "react";
import {fetchCart} from "./client/redux/Slices/cart/cartSlice.jsx";


function App() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if (token) {
            dispatch(fetchCart({token}));
        }
    }, [token, dispatch])


    return (
            <BrowserRouter>
                <div>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/products/:id" element={<ProductPage />} />


                            <Route path='/cart' element={
                                <RequireRole allowedRoles={["user"]}>
                                    <CartPage />
                                </RequireRole>
                            } />
                            <Route path='/admin' element={
                                <RequireRole allowedRoles={["admin"]}>
                                    <AdminPage />
                                </RequireRole>
                            } />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
    )
}

export default App
