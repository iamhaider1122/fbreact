import { useState } from 'react'
import app from './firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);
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
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
