import React from 'react'
import Index from './components/Index'
import Admin from './components/AdminPanel'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router> 
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App