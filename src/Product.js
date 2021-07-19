import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({id,title,image,price,rating}) {
    //basket is the state implemented in reducer


    //here const[ state , dispatch] = useStateValue();

    //when dispatch it goes to reducer.js
    const [{basket},dispatch] = useStateValue();
    console.log("THIS IS BASKET>>>",basket)

    const addToBasket = () => {
        //dispatch item to data layer

        //dispacth is how we manipulate data layer
        dispatch ({
            type:'ADD_TO_BASKET',
            // the item we are gonna push to data layer is an item with id
            item : {
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating

            }
        })


    }
    return (
        <div className="product">
            <div className="product_info">

                <p>{title}</p> 
                <p className="product_price"> 
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                   {Array(rating).fill().map( (_,i) =>(
                    <p>⭐</p>  ))}
                </div>

            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Basket</button>
            
        </div>
    )
}

export default Product
