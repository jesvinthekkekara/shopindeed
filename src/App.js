import React,{useEffect} from 'react';
import './App.css';
import Header from './Header.js';
import Home from './Home';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Checkout from './Checkout.js';
import Login from './Login';
import {auth} from './firebase';
import {useStateValue} from './StateProvider'
import Payment from './Payment';
import Orders from './Orders';

import {loadStripe} from"@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise=loadStripe("pk_test_51J892ySDZAQr983hOqxpCeIo36Agln97Sjkbn2jtMCtmMXUjH0KHaIzmpOmp7PSsYvJOw8EMoZQGCiGFmGp7FKqX002eXKtBdO");

function App() {
  const[{},dispatch] =useStateValue();


  useEffect( () => {
    //it always listen whether we are logged in or logged out. It is like an observor
    auth.onAuthStateChanged(authUser => {
      console.log("USER IS >>>" , authUser);

      if(authUser){
        //if user logged in
        dispatch ( {
          type: 'SET_USER',
          user:authUser

        })

      } else {
        //if user loged out
        dispatch({
          type:'SET_USER',
          user:null
        })

      }

    })

    

  },[])
  return (
    <Router>
      <div className="app">
      
        <Switch>

        {/* always mention it first only then / */}
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
           <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            {/* we wrap Payment element with elements that */}
            <Elements stripe={promise}>
              <Payment/>
            </Elements>

          </Route>
           {/* this will always get hit if nothing matches */}
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
         
        </Switch> 
      </div> 
    </Router>
  );
}

export default App;

