import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import LoginModal from './modals/LoginModal.jsx';

function App() {

  return (
    <div className='main-body'>
      <Header className="header" />
      <div id="background-img">
      </div>
      <LoginModal />
      <Outlet />
    </div>
  );
};

export default App;