import React,{useState,useEffect} from 'react';
import './Payment.css'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from './reducer';
import axios from './axios';
import {db} from './firebase';

function Payment() {

    const[error, setError] = useState(null);
    const[disabled,setDisabled] = useState(true);
    const[succeeded,setSucceeded] =useState(false);
    const[processing,setProcessing] =useState("");
    const[clientSecret,setClientSecret] =useState()
    const history=useHistory();


    const[{basket,user},dispatch] = useStateValue ();
    const stripe = useStripe();
    const elements = useElements();
    
    useEffect(()=>{
        //whenever basket changes it will make the request and it will update stripe's clientSecret that allows us to charge a customer the currect amount

        // we also need to tell stripe thst if you remove an item, it is changed. earlier it was $50 now it become $20

        const getClientSecret = async () => {
            const response = await axios({
                method:"post",
                //stripe expects the total in a currencies subunits. ie, if u are using dollars it expect you to pass total amount in cents ; to do that *100, depends on currency
                url:`/payments/create?total=${getBasketTotal(basket) *100}`

            })
            //now we get the secret back
            setClientSecret(response.data.clientSecret)

        }
        //we call the async function at useEffect itself. This is how it works
        getClientSecret();

    },[basket])

    console.log("Secret is >>>",clientSecret)


    const handleSubmit =async(event)=> {
        event.preventDefault ();
        setProcessing(true);
        
        // to confirm payment, we first pass clientSecret and second the object
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                //it uses clientSecret
                card: elements.getElement(CardElement)
            }
            //need to destructure so using {}
           
        }).then( ({paymentIntent}) =>{

            //uid can be fond on users when u console log it

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })


             //paymentIntent is payment confirmation
             setSucceeded(true);
             setError(null);
             setProcessing(false)

             dispatch( {
                 type:'EMPTY_BASKET'
             })

             //after payment complete push hem to orders page
            //not using history.psh because you dnt want to come back to payment page, so you swap the page using replace
             history.replace('/orders')



        })


    }

    const handleChange = e=> {
        //if event is empty , disable the button click
        setDisabled(e.empty);
       

        // if error show error
        setError(e.error?e.error.message:"");

    }

    return (
        <div className="payment">
            <div className="payment_container">
           
                <h1> 
                  
                    Checkout (<Link to="/checkout">{basket?.length} items  </Link>) 
                  
                </h1>
               
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>   
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>Thekkekara house</p>
                        <p>Malayinkeezhu</p>
                        <p>Kothamangalam</p>
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_item">
                        {basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}    />

                        ))}
                    </div>
                    
                    
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSumbit ={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat renderText ={ (value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )} 
                                decimalScale={2}
                                value={getBasketTotal(basket)} 
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"} />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ?<p>Processing</p>:"Buy Now"}</span>
                                </button>

                            </div>
                            {/* if there is an error only then show div with error ; errors like if anything wrong with card numbers etc*/}
                            {error && <div>{error}</div>}
                            
                        </form>


                    </div>
                    
                </div>

            </div>

            
        </div>
    )
}

export default Payment
