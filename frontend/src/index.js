import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import ListProduct from "./pages/ListProduct";
import NotFound from './pages/NotFound';

import './sass/index.scss';
import Product from './pages/Product';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/product/:slug" element={<Product/>} />
          <Route path="/product" element={<ListProduct/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
