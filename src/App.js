import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [characters, setCharacters] = useState([])
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)
  const [newCharacterName, setNewCharacterName] = useState('')
  const [newCharacterImage, setNewCharacterImage] = useState('')
  const [newCharacterQuote, setNewCharacterQuote] = useState('')
  const [editCharacterName, setEditCharacterName] = useState('')
  const [editCharacterImage, setEditCharacterImage] = useState('')
  const [editCharacterQuote, setEditCharacterQuote] = useState('')
  const [editFormId, setEditFormId] = useState('')

  // Index request
  const updateAllCharacters = () => {
    axios.get('http://stormy-temple-25752.herokuapp.com/characters').then((response) => {
      setCharacters(response.data)
    })
  }

  const handleNewCharacterFormSubmit = (e) => {
    e.preventDefault()
    axios.post('http://stormy-temple-25752.herokuapp.com/characters',
    {
      name: newCharacterName,
      image: newCharacterImage,
      quote: newCharacterQuote
    })
    .then(()=> {
      updateAllCharacters()
      setShowNewCharacterForm(false)
    })
  }

  const handleDeleteCharacter = (char) => {
    axios.delete(`http://stormy-temple-25752.herokuapp.com/characters/${char._id}`)
    .then(() => {
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
  const handleEditCharacterName = (e) => {
    setEditCharacterName(e.target.value)
  }
  const handleEditCharacterImage = (e) => {
    setEditCharacterImage(e.target.value)
  }
  const handleEditCharacterQuote = (e) => {
    setEditCharacterQuote(e.target.value)
  }

  const handleShowEditForm = (char) => {
    setEditFormId(char._id)
    setEditCharacterName(char.name)
    setEditCharacterImage(char.image)
    setEditCharacterQuote(char.quote)
  }

  const handleEditFormCancel = () => {
    setEditFormId('')
  }

  const handleEditFormSubmit = (char, e) => {
    e.preventDefault()
    axios.put(`http://stormy-temple-25752.herokuapp.com/characters/${char._id}`, {
      name: newCharacterName,
      image: newCharacterImage,
      quote: newCharacterQuote
    })
    .then(() => {
      updateAllCharacters()
      setEditFormId('')
    })
  }

  useEffect(()=> {
    updateAllCharacters()
  }, [])

  return (
    <div>
      <header>
        <img src="./futurama_logo.png" className="logo"/>

        {/* Conditionally render hamburger menu or full links menu */}
        <button>Hamburger icon</button>
        <ul>
          <li onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>
          { showNewCharacterForm ? `Cancel` :
            `Add New Character` }

          </li>
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
              editFormId === char._id ?
              <div key={char._id} className="card edit-card">
                <div className="edit-card-content">
                  <h2>Edit {char.name}</h2>
                  <form onSubmit={(event)=> {handleEditFormSubmit(char, event)}}>
                    Name: <input type="text" value={editCharacterName} onChange={handleEditCharacterName}/><br/>
                    Image URL: <input type="text" value={editCharacterImage} onChange={handleEditCharacterImage}/><br/>
                    Quote: <input type="text" value={editCharacterQuote} onChange={handleEditCharacterQuote}/><br/>
                    <input type="submit" value="Update this character" /><br/>
                  </form>
                  <button onClick={handleEditFormCancel}>Cancel Edit</button>
                </div>
              </div>
              :
              <div key={char._id} className="card character-card" onClick={()=> {handleShowEditForm(char)}}>
                <img src={char.image} className="character-image" />
                <h3>{char.name}</h3>
                <h4>Character quote: {char.quote}</h4>
                <button onClick={()=> {handleDeleteCharacter(char)}}>Delete {char.name}. (Cannot be undone.)</button>
              </div>
            )}
          )}
        </div>
      </main>
    </div>
  )
}

export default App
