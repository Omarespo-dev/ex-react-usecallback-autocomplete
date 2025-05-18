
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // 📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti


  //   Crea un campo di input (<input type="text">) in cui l’utente può digitare.
  const [input, setInput] = useState("")

  // Effettua una chiamata API a: 
  // http://localhost:5000/products?search=
  const [data, setData] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      try {

        //  La query deve essere sostituita con il testo digitato.
        const response = await fetch(`http://localhost:5000/products?search=${input}`)
        
        const convertJson = await response.json()

        setData(convertJson)
      } catch (err) {
        console.error(err)
      }


    }

    fetchData()

    // Se NON metti input nelle dipendenze, la fetch avviene solo una volta al montaggio del componente, e non si aggiorna più quando l’utente scrive.
  }, [input])

  console.log(data);


  return (
  <>
    <header>
      <div style={{
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        fontFamily: "arial",
        margin: "10px",
        border: "2px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Cerca prodotto"
          style={{
            padding: "10px",
            width: "100%",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        {input &&  (
          <div style={{
            maxHeight: "200px",
            overflowY: "auto",
            borderTop: "2px solid #eee",
          }}>
            {data.map(prod => (
              <p
                key={prod.id}
                style={{
                  padding: "10px",
                  margin: "0",
                  cursor: "pointer",
                  backgroundColor: "white",
                  transition: "background-color 0.3s ease",
                }}
                
              >
                {prod.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </header>
  </>
);
}

export default App

