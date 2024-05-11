import './App.css'
import React from 'react';
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListuserComponent from './components/ListuserComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserComponent from './components/userComponent'
import ProductComponent from './components/ProductComponent'
import ListProductComponent from './components/ListProductComponent'
import LoginComponent from './components/LoginComponent';
import UserService from './services/userService';
import RegisterComponent from './components/RegisterComponent';
import ProfileComponent from './components/ProfileComponent';
import DashboardComponent from './components/DashboardComponent';
import ProductDetailComponent from './components/ProductDetailComponent';
import CartComponent from './components/CartComponent';
import UserOrdersComponent from './components/UserOrdersComponent';
import AdminOrdersComponent from './components/AdminOrdersComponent';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/*---------------------------------------------- users*/}
            {/*// http://localhost:3000*/}
            <Route path='/' element = {<DashboardComponent />}></Route>
            <Route path='/public/products/:id' element = {<ProductDetailComponent />}></Route>
            <Route path='/login' element = {<LoginComponent />}></Route>
            <Route path='/register' element = {<RegisterComponent />}></Route>
            {UserService.isAuthenticated && (
              <>
                <Route path='/profile' element = { <ProfileComponent/> }></Route>
              </>
              
            )}
            {UserService.adminOnly && (
              <>
                {/*// http://localhost:3000/users*/}
                <Route path='/admin/get-all-users' element = {<ListuserComponent />}></Route>
                {/*// http://localhost:3000/add-user*/}
                <Route path='/add-user' element = { <UserComponent/> }></Route>
                {/*// http://localhost:3000/update-user/1*/}
                <Route path='/admin/update-user/:id' element = { <UserComponent/> }></Route>
                {/*--------------------------------------------- Products*/}
                {/*// http://localhost:3000/products*/}
                <Route path='/admin/products' element = {<ListProductComponent />}></Route>
                {/*// http://localhost:3000/add-user*/}
                <Route path='/admin/create-product' element = { <ProductComponent/> }></Route>
                {/*// http://localhost:3000/update-user/1*/}
                <Route path='/admin/update-product/:id' element = { <ProductComponent/> }></Route>
                {/*// http://localhost:3000/users*/}
                <Route path='/admin/orders' element = {<AdminOrdersComponent />}></Route>
              </>
              
            )}

            {UserService.isCustomer && (
              <>
                {/*// http://localhost:3000/users*/}
                <Route path='/user/cart' element = {<CartComponent />}></Route>
                {/*// http://localhost:3000/users*/}
                <Route path='/user/orders' element = {<UserOrdersComponent />}></Route>
                {/*// http://localhost:3000/update-user/1*/}
                <Route path='/user/update-user/:id' element = { <UserComponent/> }></Route>
              </>
              
            )}
            
            
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
