import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const SignInSignUp = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <div className='text'>
        <PersonOutlineIcon className='personoutlineIcon'/>
        <div onClick={handleSignUpClick}  className='signinsignuptext'>
            SignUp/SignIn
        </div>
        
    </div>
  )
}

export default SignInSignUp