import React  from 'react';
import {useHistory} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css';
import { useStateValue} from './StateProvider';
import {getBasketTotal} from './reducer';

function Subtotal() {
    //gives us browser history; <Link to /> is based links, but if we ned to push user somewhere we use history.push and it wont look like Link

    const history = useHistory()
    const [{basket}] = useStateValue();

    return (
        <div className="subtotal">
            {/* using npm i react-currency-format */} 
            <CurrencyFormat
             renderText={(value) => (
            <>
                <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal_gift">
                    <input type="checkbox"/> This order contains a gift
                   
                </small>

            </>
            
        
            )}
            decimalScale={2}
            // 250.99
            value={getBasketTotal(basket)}
            // value passed here
            displayType={"text"}
            // then only renderText will show its contents
            thousandSeparator={true}
            // 4,645.62 ; to seperate thousands
            prefix={"$"}   
        />

        <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        {/* if there is no route that matched /payment it goes to home */}
            
        </div>
          
    );
}

export default Subtotal
