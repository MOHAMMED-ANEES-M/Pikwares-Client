import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarAdmin from './Admin/NavbarAdmin';
import './App.css';
import HomeAdmin from './Admin/HomeAdmin';
import AddProduct from './Admin/AddProduct';
import SignUp from './SignUp';
import Login from './Login';
import Home from './User/Home';
import AccountCustomer from './User/AccountCustomer';
import CustomersAdmin from './Admin/CustomersAdmin';
import ViewProduct from './User/ViewProduct';
import CartCustomer from './User/CartCustomer';
import ViewProductAdmin from './Admin/ViewProductAdmin';
import ViewCartAdmin from './Admin/ViewCartAdmin';
import CheckoutCustomer from './User/CheckoutCustomer';
import PaymentCustomer from './User/PaymentCustomer';
import OrdersCustomer from './User/OrdersCustomer';
import OrdersAdmin from './Admin/OrdersAdmin';
import ViewOrderAdmin from './Admin/ViewOrderAdmin';

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
      <Route path='/customersadmin' element={<CustomersAdmin/>}/>
      <Route path='/viewproduct/:id/:category' element={<ViewProduct/>}/>
      <Route path='/cartcustomer' element={<CartCustomer/>}/>
      <Route path='/viewproductadmin/:id/:category' element={<ViewProductAdmin/>}/>
      <Route path='/viewcartadmin/:id' element={<ViewCartAdmin/>}/>   
      <Route path='/checkoutcustomer/:id/:category' element={<CheckoutCustomer/>}/>   
      <Route path='/paymentcustomer/:id' element={<PaymentCustomer/>}/>   
      <Route path='/orderscustomer' element={<OrdersCustomer/>}/>   
      <Route path='/ordersadmin' element={<OrdersAdmin/>}/>   
      <Route path='/vieworderadmin/:customerId/:productId/:orderId' element={<ViewOrderAdmin/>}/>   
      </Route>
    </Routes>
    </BrowserRouter>


      </div>
  );
}

export default App;
