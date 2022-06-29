import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/article' element={<ArticlePage />} />
          <Route path='/library' element={<LibraryPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;