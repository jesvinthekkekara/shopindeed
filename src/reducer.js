//  the data layer

export const initialState={
    // initially basket should be null; ie nothing should be in basket when you start
    basket: [],
    user:null
    
}

// Selector 
export const getBasketTotal = (basket) => 
    //reduce is an fn and what it does is it maps through the basket and tally up the total

    // we have an initial amount and we are gonna iterate through each item
    // items price is added to amount which is initialized 0
    basket?.reduce( (amount, item) => item.price + amount, 0 );







//action is what you do; are you trying to reove it , add it etc..

//switch is based on action 

//reducer is something that always listening 

const reducer=(state,action) =>{
    console.log(action)
    switch(action.type){
        // whenever you click add to basket this executes
        case 'ADD_TO_BASKET':
            return {
                // returning state what it originally was
                ...state,
                // basket should now be whatever the basket currently was + what we decided to add,ie action.item
                basket:[...state.basket, action.item]
            };
            case 'REMOVE_FROM_BASKET':
                //here deleting via index

                    //IT FINDS FIRST MATCH product and RETURN TO YOU
                    //returning index if both id are same
                    const index = state.basket.findIndex((basketItem) => basketItem.id === action.id )
                    //copying everything in  basket
                    let newBasket=[...state.basket]; 
                    if (index >=0) {
                        //it measn it found somethig in basket

                        //its cutting the index item and returns the rest
                        newBasket.splice(index,1);


                    } else {
                        console.warn(
                            `Cant remove (id:${action.id}) as nothing is there`
                            )
                    }

                    return {
                        ...state,
                        basket:newBasket

                    }
     
            case 'SET_USER' :
                 return {
                        ...state,
                        user:action.user
                    }



                    // //return everthing in basket
                    // ...state,
                    // //filter everything macthing action id
                    // basket:state.basket.filter(item => item.id !==action.id)
                    //BUT THIS DELETES ALL PRODUCTS HAVING SAME id ; changing id is not an option as same products may have same id

                 
            case 'EMPTY_BASKET':
                return{
                    //keep state as it is and also empty the basket
                    ...state,
                    basket:[]
                }
                

            default:
                return state;

    }
}
export default reducer;