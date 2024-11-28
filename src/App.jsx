import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import app from './firebase'
import { getAuth } from "firebase/auth";


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

  return (
    <>
      <div>Hello</div>
      <button onClick={() => { writeUserData('4', 'tempUser', 'tempUser@gmail.com') }}>Add data</button>
    </>
  )
}

export default App
