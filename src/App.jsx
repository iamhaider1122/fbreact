
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
Home
function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><SignUp /></>} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/home" element={<><Home /></>} />
        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;