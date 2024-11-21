import {useState, useEffect} from "react";
import {db} from "./data/db"
import Header from "./components/Header.jsx"
import Guitar from "./components/Guitar.jsx"
import Footer from "./components/Footer.jsx"


function App() {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(db)
    }, [])

    return (
        <>
            <Header />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map(() => ( // return implicito, reemplaza al () => { return() }, implica no usar funcion
                        <Guitar />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default App
