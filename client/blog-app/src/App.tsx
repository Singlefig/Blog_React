import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
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
import AddNewArticlePage from './pages/AddNewArticlePage/AddNewArticlePage';
import store from './stores/userStore';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
            <Route path='/add-new-article' element={<AddNewArticlePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;