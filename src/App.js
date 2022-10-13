import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

//The following package/link was shared by our instructor to help us get Google Maps markers working in this app: https://www.npmjs.com/package/google-maps
//We had tried several other packages and ran into issues with all of them.
import {Loader, LoaderOptions} from 'google-maps';

const API_URL = 'https://futurama-back-end.onrender.com/'
const options = {/* todo */};
const loader = new Loader('AIzaSyDPi8JMfy1GZjzQpFq1sPqzVMm6ASBLBTs', options);
let map = null
let mapsAPI = null
loader.load().then(function (google) {
  mapsAPI = google
  map = new mapsAPI.maps.Map(document.getElementById('map'), {
      center: {lat: 40, lng: -95},
      zoom: 4,
  });

    // Helpful link for error handling/implementation of getCurrentPosition: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      //axios post call to add new geolocation
      axios.post(API_URL + 'markers', {
        coords: userLocation
      }).then(()=> {
        axios.get(API_URL + 'markers')
             .then((response) => {
               console.log(response.data)
               const markersArray = response.data
               markersArray.map((marker) => {
                const markerPin = new mapsAPI.maps.Marker({
                  position: marker.coords,
                  map: map,
                });
               })
             })
      })
    }, (err) => {
      //axios get call to get array of marker objects
      axios.get(API_URL + 'markers')
           .then((response) => {
              console.log(response.data)
              const markersArray = response.data
              markersArray.map((marker) => {
              const markerPin = new mapsAPI.maps.Marker({
                position: marker.coords,
                map: map,
              });
            })
          })
    })


});

const App = () => {
  // var userLocation = {}; // will become latitude and longitude of user browser
  // var map = null;
  // function initMap() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     userLocation = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     // The map, centered at user location
  //     map = new google.maps.Map(document.getElementById("map"), {
  //       zoom: 3,
  //       center: userLocation,
  //     });
  //     // The marker, positioned at Uluru
  //     const marker = new google.maps.Marker({
  //       position: userLocation,
  //       map: map,
  //     });
  //   })
  // }
  // setTimeout(()=> {
  //   console.log(userLocation, map)
  // }, 3000);

  const [characters, setCharacters] = useState([])
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [newCharacterName, setNewCharacterName] = useState('')
  const [newCharacterImage, setNewCharacterImage] = useState('')
  const [newCharacterQuote, setNewCharacterQuote] = useState('')
  const [editCharacterName, setEditCharacterName] = useState('')
  const [editCharacterImage, setEditCharacterImage] = useState('')
  const [editCharacterQuote, setEditCharacterQuote] = useState('')
  const [editFormId, setEditFormId] = useState('')
  const [episodes, setEpisodes] = useState([])
  const [showEpisodeInfo, setShowEpisodeInfo] = useState(0)

  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [selectedEp, setSelectedEp] = useState({})


  // Index request
  const updateAllCharacters = () => {
    axios.get(API_URL + 'characters').then((response) => {
      setCharacters(response.data)
    })
  }

  const handleNewCharacterFormSubmit = (e) => {
    e.preventDefault()
    axios.post(API_URL + 'characters',
    {
      name: newCharacterName,
      image: newCharacterImage,
      quote: newCharacterQuote,
    })
    .then(()=> {
      updateAllCharacters()
      setShowNewCharacterForm(false)
    })
  }

  const handleDeleteCharacter = (char) => {
    axios.delete(API_URL + `characters/${char._id}`)
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
    axios.put(API_URL + `characters/${char._id}`, {
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
    axios.get(API_URL + 'episodes').then((response) => {
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
    setShowNavMenu(!showNavMenu)
    const menuEl = document.getElementById('menu-content')
    if(menuEl.style.right === "0px") { //if already open
      menuEl.style.right = "-90%"
      menuEl.style.boxShadow = "none"
      menuEl.style.borderBottomLeftRadius = "0px"
      menuEl.style.borderTopLeftRadius = "0px"

    } else {
      menuEl.style.right = "0px"
      menuEl.style.boxShadow = "-1px 1px 20px purple"
      menuEl.style.borderBottomLeftRadius = "50%"
      menuEl.style.borderTopLeftRadius = "20%"

    }
    if (showNewCharacterForm) {
      setShowNewCharacterForm(!showNewCharacterForm)
    }
  }


  const handleCreateUser = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    axios.post(API_URL + 'users', userObj)
      .then((response) => {
        if (response.data.username) {
          console.log(response.data);
          setToggleError(false)
          setErrorMessage('')
          setCurrentUser(response.data)
          handleToggleLogout()
        } else {
          setErrorMessage(response.data)
          setToggleError(true)
        }
      })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    axios.post(API_URL + 'sessions', userObj)
      .then((response) => {
        if (response.data.username) {
          console.log(response.data)
          setToggleError(false)
          setErrorMessage('')
          setCurrentUser(response.data)
          handleToggleLogout()
          handleToggleNavMenu()
        } else {
          console.log(response);
          setToggleError(true)
          setErrorMessage(response.data)
        }
      }
    ).then(() => {
      updateAllCharacters()
      getEpisodes()
    })
  }

  const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }

  const handleToggleLoginForm = () => {
    setToggleError(false)
    if (toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if (toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  useEffect(()=> {
    updateAllCharacters()
    getEpisodes()
  }, [])

  return (
    <>
    <div>
      <header>
        <div id='spacer'></div>
        <ul id="credits">
        By:
          <li>
            Nathan L Freeman
          </li>
          <li>
            Joey R Kozak
          </li>
        </ul>

        {/* Conditionally render hamburger menu or full links menu */}
        <div id="menu-content">
          { showNewCharacterForm ?
          <section>
            <form onSubmit={handleNewCharacterFormSubmit}>
              Name: <input type="text" placeholder="Bender Bending Rodriguez" onChange={handleNewCharacterName}/><br/>
              Image URL: <input type="text" placeholder="image path here" onChange={handleNewCharacterImage}/><br/>
              Quote: <input type="text" placeholder="Bite my shiny, metal ass!" onChange={handleNewCharacterQuote}/><br/>
              <input className="btn" type="submit" value="Add this new character" /><br/>
            </form>
            <button className="btn" onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>Cancel</button>
          </section> :
          <ul>
            {toggleLogout ?
            <>
              <li>
                <span className="nav-link" onClick={()=> {setShowNewCharacterForm(!showNewCharacterForm)}}>Add New Character</span>
              </li>
              <li>
                <a className="nav-link" onClick={handleToggleNavMenu} href="#title-text-container">List of Characters</a>
              </li>
              <li>
                <a className="nav-link" onClick={handleToggleNavMenu} href="#end-of-characters-separator">List of Episodes</a>
              </li>
              <li>
                <a className="nav-link" onClick={handleToggleNavMenu} href="#map-header">Futurama Fan Map</a>
              </li>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </> :
            <>
              <li>
                { toggleLogin ?
                  <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}/>
                    <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }}/>
                    {toggleError ?
                      <h5>{errorMessage}</h5>
                        :
                      null
                    }
                    <input className="btn" type="submit" value="Login"/>
                  </form>
                  :
                  <form onSubmit={handleCreateUser}>
                    <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}/>
                    <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
                    {toggleError ?
                      <h5>{errorMessage}</h5>
                        :
                      null
                    }
                    <input type="submit" className="btn" value="Create Account"/>
                  </form>
                }
                <button className="btn" onClick={handleToggleLoginForm}>{toggleLogin ? 'Need an Account?' : 'Already have an account?'}</button>
              </li>
            </>
            }
          </ul>
          }
        </div>
          { showNavMenu ?
          <span className="hamburger-icon" onClick={handleToggleNavMenu}><i className="material-icons large">close</i></span>
          :
          <span className="hamburger-icon" onClick={handleToggleNavMenu}><i className="material-icons large">menu</i></span> }
      </header>
      <div id="title-text-container">
        <h2 id="title-text">Welcome to our Futurama Fan App!</h2>
      </div>
      <main>
        {!currentUser.username ?
          <>
            <h2>Please Login to View Content</h2>
          </>
            :
          <>
            <section id="characters-section">
              <h2>Hot Diggity Daffodil! Meet the characters of <em>Futurama</em>!</h2>
              <div className='container row'>
              { characters ?
                <>
                {characters.map((char) => {
                  return(
                    editFormId === char._id ?
                    <div key={char._id} className="col s12 m6 l6 xl4">
                      <div  className="card edit-card">
                        <div className="edit-card-content">
                          <h3>Edit {char.name}</h3>
                          <form onSubmit={(event)=> {handleEditFormSubmit(char, event)}}>
                            Name: <input type="text" value={editCharacterName} onChange={handleEditCharacterName}/><br/>
                            Image URL: <input type="text" value={editCharacterImage} onChange={handleEditCharacterImage}/><br/>
                            Quote: <input type="text" value={editCharacterQuote} onChange={handleEditCharacterQuote}/><br/>
                            <button className="btn" type="submit">Update this character</button><br/>
                          </form>
                          <button className="btn cancel" onClick={handleEditFormCancel}>Cancel Edit</button>
                        </div>
                      </div>
                    </div>
                    :
                    <div key={char._id} className="col s12 m6 l6 xl4">
                      <div  className="card character-card hoverable" onClick={()=> {handleShowEditForm(char)}}>
                        <img src={char.image} className="character-image responsive-img" />
                        <h3 className="aliense-on-hover">{char.name}</h3>
                        <h5>"{char.quote}"</h5>
                        <button className="btn delete" onClick={()=> {handleDeleteCharacter(char)}}>Delete {char.name}. (Cannot be undone.)</button>
                      </div>
                    </div>
                  )}
                )}
                </>
                  :
                null
              }
              </div>
              <div id="end-of-characters-separator"></div>
            </section>
            <section id="episodes-section">
              <h2 id="episodes-section-header">Futurama Episode Information</h2>
              <h5 id="episodes-section-subtext">"I am Melllvar! Seer of the Tapes! Knower of the Episodes!"</h5>
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
                    <button className="btn" onClick={handleCloseEpisodeInfo}>Back</button>
                  </div>
                </div>
              :
              null
              }
            </section>
          </>
        }
      </main>
      <h2 id="map-header">Futurama Fan Map</h2>
      <h5>You're entering the vicinity of an area adjacent to a location...</h5>
      <h5 id="map-description">Each pin on the map represents a visitor to this site. Futurama fans exist all over the world!</h5>
      <div id="map"></div>
    </div>

    </>
  )
}

export default App
