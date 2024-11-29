import { useState } from 'react'
import app from './firebase'
import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
function SignUp() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user, 'user created');

        // Update the user's profile with the name
        await updateProfile(user, {
          displayName: name,
        });

        console.log('User profile updated with name:', name);

        // Navigate to the login page or dashboard
        navigate('/login');
      })
      .catch((error) => {
        console.log('ERROR:::', error);
        alert(error.message);
      });
  };

  const googleSignIn = async () => {
    console.log('signUp with google...');

    //prompt parameter to force choosing account
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, 'user end', credential, 'cred end', token, 'token end');
        navigate('/home')
      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERROR:', error);
        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  return (
    <>
      <div className="container mt-5  ">
        <div className="row justify-content-center  ">
          <div className="col-8 border border-2 p-5 customCard">
            <h3 className="text-center text-secondary">Sign Up</h3>
            <form onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleOnChange}
                  id="name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleOnChange}
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleOnChange}
                  className="form-control"
                  id="password"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <p className="mt-5">Already Have an account <Link to={`/login`} className=" ms-2 btn btn-primary">Login</Link></p>
            <button className='btn btn-warning' onClick={googleSignIn}>Sign In with Google</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
