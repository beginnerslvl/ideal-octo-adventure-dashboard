import React from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import {auth} from '../../firebase'



const Signup = () => {
    const [email,setEm] = useState("")
    const [pass,setPass]  = useState("")

    const onSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  return (
    <div className='sign-in-container'>
        <form onSubmit={onSignUp}>
            <h1>Create account</h1>
            <input
            type='email'
            placeholder='enter email'
            value={email}
            onChange={(e)=> setEm(e.target.value)}
            />
              <input
            type='password'
            placeholder='enter password'
            value={pass}
            onChange={(e)=> setPass(e.target.value)}
            />
            <button>Sign up</button>
        </form>
    </div>
  )
}

export default Signup