import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Todos from './Components/Todos'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/todo' element={<Todos/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
