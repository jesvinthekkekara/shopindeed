import React,{useState} from 'react'
import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import {auth} from './firebase';


function Login() {
    const history = useHistory();
    const[email,setEmail] =useState("");
    const[password,setPassword] =useState("");


    // signIn function takes an event e since it is inside form
    const signIn = e =>{
        // not to do refreshing
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(auth => {
            //if auth sucessfull move to / route
            history.push('/')
        })
        .catch(error =>alert(error.message))



    }
    const register = e =>{
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email,password)
        //after creating user it will come back with auth object
        .then((auth) => {
            //means it successfully creating user
            console.log("NEW USER >>>",auth)

            //if auth comes back or it is not empty
            if(auth) {
                //push this view page or redirect to home page
                history.push('/');

            }
        }) 
        .catch (error => alert(error.message) )


    }

    return (
        <div className="login"> 
        <Link to ="/">
            <img className="login_logo" src="https://dcassetcdn.com/design_img/9458/25810/25810_275871_9458_image.png" />


        </Link>
        <div className="login_container">
            <h1>Sign In</h1>

            <form>
                <h5>E-mail</h5>
                {/* onChange function gives us an event e */}
                <input type="text" value={email} onChange={e=> setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" vaue={password} onChange={e=>setPassword(e.target.value)} />

                <button type="submit" onClick={signIn} className="login_signInButton">Sign In</button>

            </form>
            <p>
                By signing in you agree to Amazon's Terms & Conditions
            </p>
            <button type="submit" onClick={register} className="login_registerButton">Create an account</button>
        </div>
            
        </div>
    )
}

export default Login
