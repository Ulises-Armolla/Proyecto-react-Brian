import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Search from '../pages/Search';
import Countries from '../pages/Countries';
import Country from '../pages/Country';
import Home from '../pages/Home';

function App(){
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <div className='conatiner-fluid mt-3'>
          <Routes>
            <Route path='/search' element={<Search/>}/>
            <Route path='/countries' element={<Countries/>}/>
            <Route path='/country/:name' element={<Country/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;