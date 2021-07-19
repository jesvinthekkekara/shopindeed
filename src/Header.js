import React from 'react';
import './Header.css' ;
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import {useStateValue} from './StateProvider';
import {auth} from './firebase';

function Header() {
    const [{basket,user}] =useStateValue();
    const handleAuthentication =()=> {
        if (user){
            auth.signOut();

        }

    }
console.log("USER EMAIL>>>",user?.email)

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" 
                    src="https://dcassetcdn.com/design_img/9458/25810/25810_275871_9458_image.png"
                    alt="Amazon logo"/>
            </Link>
         

            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon"/>

            </div>

            <div className="header_nav">
                {/* to prevent going to login page after signout */}

                <Link to ={!user && "/login"}>
                    <div onClick={handleAuthentication} className="header_option">
                        <span className="header_optionLineOne">Hello {user? user?.email:"Guest"} </span>
                        <span className="header_optionLineTwo">{user?"Sign Out":"Sign In"}</span>

                    </div>
                </Link>
                <Link to ="/orders">
                <div className="header_option">
                <span className="header_optionLineOne">Returns</span>
                <span className="header_optionLineTwo">Orders</span>
                    
                </div>

                </Link>
               
                <div className="header_option">
                <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                    
                </div>
                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon/>
                        {/* if basket becomes undefined its okay if basket?. is added */}
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>

                    </div>

                </Link>
               

            </div>
            
        </div>
    )
}

export default Header
