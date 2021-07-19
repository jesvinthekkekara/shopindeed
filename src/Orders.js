import React,{useState,useEffect} from 'react'
import './Orders.css';
import {useStateValue} from './StateProvider';
import Order from './Order';
import {db} from './firebase'
import { Link } from 'react-router-dom';


function Orders() {
    const[{basket,user}] = useStateValue();
    const[orders,setOrders] = useState([])
    useEffect(()=>{
        if(user){
            db.collection('users').doc(user?.uid).collection('orders').orderBy('created','desc')
            //real time response
            .onSnapshot(snapshot =>(
                setOrders(snapshot.docs.map(doc =>({
                    id:doc.id,
                    data:doc.data()
                })))
            ))

        }else{
            setOrders([])
        }
     

    },[user])
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {!orders?  <Order order={orders}/> :<p style={{fontSize:"50px",fontWeight:"bold"}}>Oops! No Orders</p>}
                <Link to="/">
                    <button className="button_home">Go to home</button>
                </Link>
               
            
            </div>


            
        </div>
    )
}

export default Orders
