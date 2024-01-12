import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarAdmin from './Admin/NavbarAdmin';
import './App.css';
import HomeAdmin from './Admin/HomeAdmin';
import AddProduct from './Admin/AddProduct';
import SignUp from './SignUp';
import Login from './Login';
import Home from './User/Home';
import AccountCustomer from './User/AccountCustomer';

function App() {

  let userId = localStorage.getItem('userId')
  console.log(userId,'oo');

  return (
      <div className='App'>


<BrowserRouter>
    <Routes>
      <Route path='/' element={<NavbarAdmin/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/addproductadmin' element={<AddProduct/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/homeadmin' element={<HomeAdmin/>}/>
      <Route path='/accountcustomer' element={<AccountCustomer/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>


      </div>
  );
}

export default App;
