
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { lodeUser } from "./Actions/User";
import './App.css';
import Account from "./Components/Account/Account";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Uplodepost from "./Components/NewPostUplode/UplodePost";
import NotFound from "./Components/page not found/pageNotFound";
import Register from "./Components/Register/Register";
import Search from "./Components/Search/Search";
import Updatepassword from "./Components/Update password/UpdatePassword";
import Updateprofile from "./Components/UpdateProfile/Updateprofile";
import Userprofile from "./Components/User Profile/Userprofile";
import Header from "./Components/Header/Header";





function App() {
  const dispatch = useDispatch();
  const store = useSelector((store)=>store.user);
  
  
  useEffect(()=>{
    dispatch(lodeUser());
   },[dispatch]);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      
      <Route index path="/"  element={store.isAuthenticated? (<ErrorBoundary> <Home/></ErrorBoundary>):<Login />} />
      <Route  path="update/profile"  element={store.isAuthenticated? (<ErrorBoundary> <Updateprofile/></ErrorBoundary>):<Login />} />
      <Route path="register" element={store.isAuthenticated?(<ErrorBoundary> <Home/></ErrorBoundary>):< Register/> } />
      <Route path="/user/:id" element={store.isAuthenticated?(<ErrorBoundary> <Userprofile/></ErrorBoundary>):<Login /> } />
      <Route path="update/password" element={store.isAuthenticated?(<ErrorBoundary> <Updatepassword/></ErrorBoundary>):< Login/> } />
      <Route path="forgot/password" element={(<ErrorBoundary> <ForgotPassword/></ErrorBoundary>) } />

      <Route path="/newpost" element=
      {
        store.isAuthenticated?
        (<ErrorBoundary> <Uplodepost/> </ErrorBoundary>) :   <Login />} />

      <Route path="account" element=
      {store.isAuthenticated?
        
        (<ErrorBoundary> <Account/> </ErrorBoundary>) : <Login />} />
    <Route path="search" element={store.isAuthenticated?(<ErrorBoundary> <Search /></ErrorBoundary>):< Login/> }/>
    <Route path="*" element={<NotFound/>} />
    </Routes>
    { store.isAuthenticated&&<Footer/>}
    </BrowserRouter>
  );
}

export default App;
