import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './containers/Products/Products';
import ProductAdd from './containers/Products/ProductAdd';
import ProductDetails from './containers/Products/ProductDetails';
import ProductEdit from './containers/Products/ProductEdit';


const App = () => (
  <Routes>
    <Route exact path='/' element={<Products/>} />
    <Route exact path='/product/' element={<Products/>} />    
    <Route exact path='/product/add/' element={<ProductAdd/>} />
    <Route exact path='/product/details/:id/' element={<ProductDetails/>} />
    <Route exact path='/product/edit/:id/' element={<ProductEdit/>} />    
  </Routes>
)

export default App;
