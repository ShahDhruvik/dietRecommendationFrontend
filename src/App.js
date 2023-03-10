import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
