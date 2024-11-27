import {useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import {db}  from "./data/db.js";


function App() {
    // Hooks
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        setData(db)
    }, [])

    // Constantes
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    // Funciones
    function addToCart(item) {
        const itemExist = cart.findIndex( guitar => guitar.id === item.id);

        if(itemExist >= 0)  {
            if(item.quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity ++;
            setCart(updatedCart);
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart( prevCart => prevCart.filter( guitar => guitar.id !== id ) );
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {...item, quantity: item.quantity + 1}
            }
            return item
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {...item, quantity: item.quantity - 1}
            }
            return item
        })
        setCart(updatedCart)
    }

    // Returns
    return (
    <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map(guitar => {
                    return (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    )
                })}
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

    </>
    )
}

export default App
