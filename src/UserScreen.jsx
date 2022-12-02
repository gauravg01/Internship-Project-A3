import logo from './assets/icons8-connect-develop-48.svg'
import friends from './assets/animation_500_l859okyg.gif';
import CardView from './components/LoginCardView';
import './UserScreen.css';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import { useLocation } from 'react-router-dom';

function App() {
  const { state } = useLocation();
  const { res } = state;
  console.log("its "+JSON.stringify(state));

  return (
    <div className="MainApp">
    <header className="App-header">
        <NavBar pwd = {res['userDetail']['password']} pic = {res['userDetail']['photo']} bio = {res['userDetail']['userBio']} email = {res['userDetail']['userEmail']} name = {res['userDetail']['userName']} phone = {res['userDetail']['userMobileNo']}></NavBar>
    <div className='container-2'>
    <Profile pic = {res['userDetail']['photo']} bio = {res['userDetail']['userBio']} email = {res['userDetail']['userEmail']} name = {res['userDetail']['userName']} phone = {res['userDetail']['userMobileNo']} ></Profile>
    </div>
    </header>
  </div>
  );
}

export default App;
