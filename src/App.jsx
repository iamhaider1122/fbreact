
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import FireStoreDb from './FireStoreDb';

function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>< FireStoreDb /></>} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;