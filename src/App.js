import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddUser from './components/AddUser/AddUser';
import UserDetails from './components/UserDetails/UserDetails';
import Users from './components/Users/Users';
import Header from './components/Header/Header';
import Update from './components/Update/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/users' element={<Users />} />
          <Route path='/addUser' element={<AddUser />} ></Route>
          
          <Route path='/userDetails/:id' element={<UserDetails />} ></Route>

          
          <Route path='/user/update/:id' element={<Update />}></Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
