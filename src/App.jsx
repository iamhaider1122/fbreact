import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import app from './firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(app);
function App() {

  function writeUserData(userId, name, email) {
    console.log('i am in writeuserData function');
    const db = getDatabase(app);
    set(ref(db, 'users/mydata' + userId), {
      id: userId,
      username: name,
      email: email,
    });
  }

  function SignUp(email, password) {
    console.log('creating user...')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user, 'user created');
      })
      .catch((error) => {
        console.log('ERROR:::', error);
        alert(error);
      });
  }

  return (
    <>
      <div>Hello</div>
      <button onClick={() => { SignUp('tempUser@gmail.com', '12345678') }}>Sign Up</button>
    </>
  )
}

export default App
