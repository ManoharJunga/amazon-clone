import React from 'react'
import WelcomeBar from '../../Components/WelcomeBar'
import MenuToggleBar from '../../Components/MenuToggleBar'
import SearchBar from '../../Components/SearchBar'
import SignInSignUp from '../../Components/SignInSignUp'
import './Header.css'
import PanelContent from '../../Components/PanelContent'


function Header() {
  return (
    <>
    <WelcomeBar />
    <div className='main'>
    <MenuToggleBar />
    <SearchBar />
    <SignInSignUp />
    </div>
    <PanelContent />
  </>
  )
}

export default Header;