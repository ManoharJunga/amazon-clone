import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeBar from '../Components/WelcomeBar'
import MenuToggleBar from '../Components/MenuToggleBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WelcomeBar />
      <MenuToggleBar />
    </>
  )
}

export default App
