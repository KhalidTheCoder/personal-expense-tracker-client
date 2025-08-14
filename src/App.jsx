
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
 

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
