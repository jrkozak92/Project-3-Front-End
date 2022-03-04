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
  const [episodes, setEpisodes] = useState([])
  const [showEpisodeInfo, setShowEpisodeInfo] = useState(0)
  const [selectedEp, setSelectedEp] = useState({})

  // Index request
  const updateAllCharacters = () => {
    axios.get('https://stormy-temple-25752.herokuapp.com/characters').then((response) => {
      setCharacters(response.data)
    })
  }

  const handleNewCharacterFormSubmit = (e) => {
    e.preventDefault()
    axios.post('https://stormy-temple-25752.herokuapp.com/characters',
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
    axios.delete(`https://stormy-temple-25752.herokuapp.com/characters/${char._id}`)
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
    axios.put(`https://stormy-temple-25752.herokuapp.com/characters/${char._id}`, {
      name: editCharacterName,
      image: editCharacterImage,
      quote: editCharacterQuote
    })
    .then(() => {
      updateAllCharacters()
      setEditFormId('')
    })
  }

  const getEpisodes = () => {
    axios.get('https://stormy-temple-25752.herokuapp.com/episodes').then((response) => {
      const rawData = response.data
      rawData.sort((a,b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
      })
      setEpisodes(rawData)
    })
  }

  const handleShowEpInfo = (ep) => {
    setSelectedEp(ep)
    setShowEpisodeInfo(ep.id)
  }

  const handleCloseEpisodeInfo = () => {
    setShowEpisodeInfo(0)
  }

  const handleToggleNavMenu = () => {
    const menuEl = document.getElementById('menu-content')
    if(menuEl.style.right === "0px") {
      menuEl.style.right = "-80%"
    } else {
      menuEl.style.right = "0px"
    }
    if (showNewCharacterForm) {
      setShowNewCharacterForm(!showNewCharacterForm)
    }
  }

  useEffect(()=> {
    updateAllCharacters()
    getEpisodes()
  }, [])

  return (
    <div>
      <header>
        <img src="./futurama_logo.png" className="logo"/>

        {/* Conditionally render hamburger menu or full links menu */}
        
          <div id="menu-content">
            { showNewCharacterForm ?
            <section>
              <form onSubmit={handleNewCharacterFormSubmit}>
                Name: <input type="text" placeholder="Bender Bending Rodriguez" onChange={handleNewCharacterName}/><br/>
                Image URL: <input type="text" placeholder="image path here" onChange={handleNewCharacterImage}/><br/>
                Quote: <input type="text" placeholder="Bite my shiny, metal ass!" onChange={handleNewCharacterQuote}/><br/>
                <input type="submit" value="Add this new character" /><br/>
              </form>
              <button onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>Cancel</button>
            </section> :
            <ul>
              <li onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>
                Add New Character 
              </li>
              <li onClick={handleToggleNavMenu}><a href="#episodes-section">List of Episodes</a></li>
            </ul> 
            }
            
          </div>
        <a href="#" className="hamburger-icon" onClick={handleToggleNavMenu}><i className="material-icons large">menu</i></a>
      </header>
      <main>
        <section id="characters-section">
          <h2>Hot Diggity Daffodil! Meet the characters of <em>Futurama</em>!</h2>
          <div className='container row'>

            {characters.map((char) => {
              return(
                editFormId === char._id ?
                <div key={char._id} className="col s12 m6 l4 xl3">
                  <div  className="card edit-card">
                    <div className="edit-card-content">
                      <h3>Edit {char.name}</h3>
                      <form onSubmit={(event)=> {handleEditFormSubmit(char, event)}}>
                        Name: <input type="text" value={editCharacterName} onChange={handleEditCharacterName}/><br/>
                        Image URL: <input type="text" value={editCharacterImage} onChange={handleEditCharacterImage}/><br/>
                        Quote: <input type="text" value={editCharacterQuote} onChange={handleEditCharacterQuote}/><br/>
                        <input type="submit" value="Update this character" /><br/>
                      </form>
                      <button onClick={handleEditFormCancel}>Cancel Edit</button>
                    </div>
                  </div>
                </div>
                :
                <div key={char._id} className="col s12 m6 l4 xl3">
                  <div  className="card character-card hoverable" onClick={()=> {handleShowEditForm(char)}}>
                    <img src={char.image} className="character-image responsive-img" />
                    <h3>{char.name}</h3>
                    <h6>Character quote: {char.quote}</h6>
                    <button onClick={()=> {handleDeleteCharacter(char)}}>Delete {char.name}. (Cannot be undone.)</button>
                  </div>
                </div>
              )}
            )}
          </div>
        </section>
        <section id="episodes-section">
          <h2>Futurama Episode Information</h2>
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th>Episode</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes.map((ep) => {
                    return (
                      <tr key={ep.id} className="hoverable" onClick={()=> {handleShowEpInfo(ep)}}>
                        <td>{ep.episodeNum}</td>
                        <td>{ep.title}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {
            showEpisodeInfo === selectedEp.id ?
              <div className="whole-modal">
                <div className="episode-modal" onClick={handleCloseEpisodeInfo}>
                </div>
                <div className="episode-modal-content">
                  <h4>{selectedEp.title}</h4>
                  <h5>Ep No. {selectedEp.episodeNum}</h5>
                  <h5>Written by {selectedEp.writers}</h5>
                  <h5>Original Air Date {selectedEp.airdate}</h5>
                  <p>{selectedEp.description}</p>
                  <button onClick={handleCloseEpisodeInfo}>Back</button>
                </div>
              </div>
            :
            null
            }
        </section>
      </main>
    </div>
  )
}

export default App
