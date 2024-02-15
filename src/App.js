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
import ViewOrderCustomer from './User/ViewOrderCustomer';
import PaymentSuccess from './User/PaymentSuccess';
import RateProductCustomer from './User/RateProductCustomer';
import WishlistCustomer from './User/WishlistCustomer';
import ChatListAdmin from './Admin/ChatListAdmin';
import ChatAdmin from './Admin/ChatAdmin';
import ChatCustomer from './User/ChatCustomer';
import ChatListCustomer from './User/ChatListCustomer';

function App() {

  // let userId = localStorage.getItem('userId')
  // // console.log(userId,'oo');

  return (
      <div className='App'>


<BrowserRouter>
    <Routes>
      <Route path='/' element={<NavbarAdmin/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/homeadmin' element={<HomeAdmin/>}/>
      <Route path='/accountcustomer' element={<AccountCustomer/>}/>
      <Route path='/customersadmin' element={<CustomersAdmin/>}/>
      <Route path='/viewproduct/:id/:category' element={<ViewProduct/>}/>
      <Route path='/cartcustomer' element={<CartCustomer/>}/>
      <Route path='/wishlistcustomer' element={<WishlistCustomer/>}/>
      <Route path='/chatlistcustomer' element={<ChatListCustomer/>}/>
      <Route path='/chatcustomer/:id' element={<ChatCustomer/>}/>
      <Route path='/viewproductadmin/:id/:category' element={<ViewProductAdmin/>}/>
      <Route path='/viewcartadmin/:id' element={<ViewCartAdmin/>}/>   
      <Route path='/checkoutcustomer/:id/:category' element={<CheckoutCustomer/>}/>   
      <Route path='/paymentcustomer/:id/:amount/:counts' element={<PaymentCustomer/>}/>   
      <Route path='/paymentreciept' element={<PaymentSuccess/>}/>   
      <Route path='/orderscustomer' element={<OrdersCustomer/>}/>   
      <Route path='/viewordercustomer/:orderId' element={<ViewOrderCustomer/>}/>   
      <Route path='/ordersadmin' element={<OrdersAdmin/>}/>   
      <Route path='/chatlistadmin' element={<ChatListAdmin/>}/>   
      <Route path='/chatadmin/:id' element={<ChatAdmin/>}/>   
      <Route path='/vieworderadmin/:customerId/:orderId' element={<ViewOrderAdmin/>}/>   
      <Route path='/rateproduct/:productId/:customerId' element={<RateProductCustomer/>}/>   
      </Route>
    </Routes>
    </BrowserRouter>


      </div>
  );
}

export default App;
