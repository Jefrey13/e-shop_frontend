import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginPage, SignupPage, ActivationPage, HomePage} from './Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { server } from './server';
import {toast} from 'react-toastify'
import Store from './redux/store'
import {loadUser} from './redux/actions/user'

const App = () => {
  // useEffect(()=>{
  //   axios.get(`${server}/user/getuser`, {useCredentials: true})
  //   .then((res)=>{
  //     console.log(res.data);
  //   }).catch((err)=>{
  //     toast.error(err.response.data.message);
  //   });
  // }, []);
  useEffect(()=>{
    Store.dispatch(loadUser());
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignupPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
      </Routes>
      <ToastContainer
      position='bottom-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'>

      </ToastContainer>
    </BrowserRouter>
  )
}

export default App
