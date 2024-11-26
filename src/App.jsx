import {useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import {db}  from "./data/db.js";


function App() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    function addToCart(item) {
        // Recorre sin inmutar el state
        const itemExist = cart.findIndex( guitar => guitar.id === item.id);
        if(itemExist >= 0)  {
            // Copia del state para no mutarlo al modificar la cantidad de sus elementos
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

    useEffect(() => {
        setData(db)
    }, [])

    return (
    <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map(guitar => {
                    return (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            //setCart={setCart}
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
