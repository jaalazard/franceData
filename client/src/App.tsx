import { useState, useEffect } from 'react'
import './main.css'

interface Town {
  ville_id: number;
  ville_nom: string;
}

function App() {
  const [towns, setTowns] = useState<Town[]>([]);

  useEffect(() => {
    const getTowns = async () => {
      try {
        const response = await fetch("http://localhost:5000/towns");
        if (response.ok) {
          const towns = await response.json();
          setTowns(towns);
        } else {
          console.error(
            `Erreur de récupération des villes: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des villes:", error);
      }
    };
    getTowns();
  }, [],);

  return (
    <>
      <h1 className='text-3xl uppercase'>Liste des villes</h1>
      <div className="border">
        <ul>
          {towns.map((town: Town) => (
            <li key={town.ville_id}>
              <h2 className='text-2xl'>{town.ville_nom}</h2>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
