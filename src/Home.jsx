import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app);
function Home() {

  const navigate = useNavigate();
  const signOutApp = async () => {

    try {
      await signOut(auth);
      console.log('Signed out successfully');
      navigate('/login')
    } catch (error) {
      console.error('Error during sign out:', error);
    }

  }
  return (
    <>
      <div>Hello, Welcome to home</div>
      <button className='btn btn-warning mt-3' onClick={signOutApp}>Sign Out</button>


    </>
  )
}

export default Home
