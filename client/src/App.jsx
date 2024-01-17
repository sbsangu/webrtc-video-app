
import {Routes,Route} from "react-router-dom"
import Lobby from "./screens/Lobby.jsx"
import Room from "./screens/Room.jsx"
// import "./index.css"

function App() {
 

  return (
    <>
      <Routes>

        <Route path="/" element={<Lobby/>}/>
        <Route path="/room/:roomId" element={<Room/>}/>
      </Routes>
    </>
  )
}

export default App
