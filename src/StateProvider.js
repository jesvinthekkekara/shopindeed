import React,{createContext,useContext,useReducer} from 'react';

// this prepares the data layer
export const StateContext = createContext();

// wrap our app and provide data layer to other components
export const StateProvider =({ reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

// pull info from data layer
export const useStateValue = () => useContext(StateContext);