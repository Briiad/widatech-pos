// State for Date, Customer_Name, Salesperson_Name, Notes, and Products (Multiple Sold Products)
import { combineReducers } from 'redux';

const initialState = {
    date: '',
    customer_name: '',
    salesperson_name: '',
    notes: '',
    products: []
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                date: action.date
            };
        case 'SET_CUSTOMER_NAME':
            return {
                ...state,
                customer_name: action.customer_name
            };
        case 'SET_SALESPERSON_NAME':
            return {
                ...state,
                salesperson_name: action.salesperson_name
            };
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.notes
            };
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

export default combineReducers({
    rootReducer
});