import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [characters, setCharacters] = useState([])

  // Index request
  const updateAllCharacters = () => {
    axios.get('http://localhost:3000/characters' || 'http://stormy-temple-25752.herokuapp.com/characters').then((response) => {
      setCharacters(response.data)
    })
  }
  
  useEffect(()=> {
    updateAllCharacters()
  }, [])

  return (
    <div>
      <header>
        <h1>Futurama App</h1>
        {/* Conditionally render hamburger menu or full links menu */}
        <button>Hamburger icon</button>
      </header>
      <main>
        <h2>Section Title (Characters or Eps, whatever)</h2>
        <div className='container'>
          
          {characters.map((char) => {
            return(
                <div key={char._id} className="card character-card">
                <img src={char.image} className="character-image" />
                <h3>{char.name}</h3>
                <h4>Character quote: {char.quote}</h4>
              </div>
            )}
          )}
        </div>
      </main>
    </div>
  )
}

export default App