import React from 'react'
import WelcomeBar from '../../Components/WelcomeBar'
import MenuToggleBar from '../../Components/MenuToggleBar'
import SearchBar from '../../Components/SearchBar'
import './Home.css'

function Home() {
  return (
    <>
    <WelcomeBar />
    
    <div className='main'>
    <MenuToggleBar />
    <SearchBar />
    </div>
  </>
  )
}

export default Home