import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { HomePage } from './pages/HomePage/HomePage';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:id'  element={<Button
                    fillColor="#3a4362"
                    textColor="#ffffff"
                    text="Subscribe"
                    onClick={() => alert('Suscribed!')}
                    disabled={false}
                    width="108px"
                    height="36px"
                />} />
        <Route path='/article/:id' element={<Button
                    fillColor="#3a4362"
                    textColor="#ffffff"
                    text="Subscribe"
                    onClick={() => alert('Suscribed!')}
                    disabled={false}
                    width="108px"
                    height="36px"
                />} />
        <Route path='/library' element={<LibraryPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;