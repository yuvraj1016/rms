import { Route,Routes } from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Signup from './components/signup/Signup.jsx';
import User from './components/user/User.jsx';
import Completeprofile from './components/completeprofile/Completeprofile.jsx';
import Admin from './components/Admin/Admin.jsx';
import Shop from './components/Shop/Shop.jsx';
import Shopowner from './components/shopowner/Shopowner.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop-owner' element={<Shopowner />} />
        <Route path='/complete-profile' element={<Completeprofile />} />
       </Routes>
    </div>
  );
}

export default App;
