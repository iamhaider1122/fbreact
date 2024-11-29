import { useState } from 'react'
import app from './firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);
function Login() {

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user, 'user SignIn');

        // Navigate to the Home page
        navigate('/home');
      })
      .catch((error) => {
        console.log('ERROR:::', error);
        alert(error.message);
      });
  };

  return (
    <>
      <div className="container mt-5  ">
        <div className="row justify-content-center  ">
          <div className="col-8 border border-2 p-5 customCard">
            <h3 className="text-center text-secondary">Sign Up</h3>
            <form onSubmit={handleSignIn}>

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
                Sign In
              </button>
            </form>
            <p className="mt-5">Don't have an account <Link to={`/`} className=" ms-2 btn btn-primary">SignUp</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
