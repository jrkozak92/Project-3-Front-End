import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [characters, setCharacters] = useState([])
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)
  const [newCharacterName, setNewCharacterName] = useState('')
  const [newCharacterImage, setNewCharacterImage] = useState('')
  const [newCharacterQuote, setNewCharacterQuote] = useState('')

  // Index request
  const updateAllCharacters = () => {
    axios.get('http://localhost:3000/characters' || 'http://stormy-temple-25752.herokuapp.com/characters').then((response) => {
      setCharacters(response.data)
    })
  }

  const handleNewCharacterFormSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/characters' || 'http://stormy-temple-25752.herokuapp.com/characters', 
    {
      name: newCharacterName,
      image: newCharacterImage,
      quote: newCharacterQuote
    })
    .then(()=> {
      updateAllCharacters()
    })
  }

  const handleNewCharacterName = (e) => {
    setNewCharacterName(e.target.value)
  }
  const handleNewCharacterImage = (e) => {
    setNewCharacterImage(e.target.value)
  }
  const handleNewCharacterQuote = (e) => {
    setNewCharacterQuote(e.target.value)
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
        <ul>
          <li onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>Add New Character</li>
        </ul>
      </header>
      <main>
        { showNewCharacterForm ? 
        <section>
          <form onSubmit={handleNewCharacterFormSubmit}>
            Name: <input type="text" placeholder="Bender Bending Rodriguez" onChange={handleNewCharacterName}/><br/>
            Image URL: <input type="text" placeholder="image path here" onChange={handleNewCharacterImage}/><br/>
            Quote: <input type="text" placeholder="Bite my shiny, metal ass!" onChange={handleNewCharacterQuote}/><br/>
            <input type="submit" value="Add this new character" /><br/>
          </form>
        </section> : 
        null }
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