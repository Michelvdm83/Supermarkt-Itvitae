import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {

  const navigate = useNavigate();

  return (
    <div className="container">
      <NavigationBar />
    </div>
  )
}

export default App
