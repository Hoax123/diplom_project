import {MainScreen} from "./mainScreen/mainScreen.jsx";
import {ProductsList} from "./ProductsList/ProductsList.jsx";

export function HomePage() {
    return (
        <div>
            <MainScreen/>
            <ProductsList/>
        </div>
    )
}