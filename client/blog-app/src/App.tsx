import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import LoginPage from './pages/LoginPage/LoginPage';
import AccountPage from './pages/AccountPage/AccountPage';
import MyArticlesPage from './pages/MyArticlesPage/MyArticlesPage';
import store from './stores/userStore';

const App = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/article' element={<ArticlePage />} />
          <Route path='/library' element={<LibraryPage />} />
          <Route path='/my-account' element={<AccountPage />} />
          <Route path='/my-articles' element={<MyArticlesPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </Provider>
  );
}

export default App;