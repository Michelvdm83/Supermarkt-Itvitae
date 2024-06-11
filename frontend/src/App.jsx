import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './pages/login/Login';

function App() {

  const navigate = useNavigate();

  return (
    <div className="container">
      <NavigationBar />
      <Routes>
        <Route path='/login' element={<Login role="customer"/>} />
      </Routes>
    </div>
  )
}

export default App
