import React from 'react';
import './App.css';
import Login from './Login'
import Menu from './Menu'
import { useCookies } from 'react-cookie';
import ClientView from "./ClientView"
import pageIndex from './pageIndex'
import NewBooking from './NewBooking'
import BookingHistory from './BookingHistory'
import Register from './Register'


export var LoginStateContext = React.createContext([0, ()=>{}]);
export var PageStateContext = React.createContext([0, ()=>{}]);

export default function App() {
  //create the login Cookie tab
  const [loginCookie, setLoginCookie] = useCookies(['login',0]);
  
  const changeCookie = (newLogin)=> {
    setLoginCookie('login', newLogin, { path: '/' });
  }

  const logged = typeof(loginCookie.login) == "undefined"? [0,-1] : loginCookie.login
  //create the current page state - this handles changes between pages.
  const [currPage, setCurrPage] = React.useState("home");
  
  

  LoginStateContext = React.createContext([logged,changeCookie]);
  PageStateContext = React.createContext([currPage, setCurrPage]);
  console.log("Current page: ", currPage)
  //to retrieve these variables we just subscribe using: 
  //{logged, setlogged} = React.useContext(LoginStateContext);

  return (
    <div>
      <PageStateContext.Provider value={ [currPage,setCurrPage] }>
        <header className="App-header">
            <Menu     />
        </header>
        <div className="App" style = {{overflowX: "hidden", position: "static"}}>
          <LoginStateContext.Provider value={ [logged,changeCookie] }>
          
            {/* eslint eqeqeq: 0  */}
            { logged[0] == 0 ?     <Login/>    : null}
            { logged[0] == 0 && currPage == "register"?     <Register/>    : null}
            { logged[0] >= 1 && currPage == "home" ?   <ClientView/> : null}
            { logged[0] >= 1 && currPage == "newBooking" ?   <NewBooking/> : null}
            { logged[0] >= 1 && currPage == "oldBooking" ?   <BookingHistory/> : null}
          </LoginStateContext.Provider>
        
        </div>
      </PageStateContext.Provider>
    </div>
  );
}
