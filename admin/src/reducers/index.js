import { combineReducers } from 'redux';
import categories from './categoriesReducer';
import products from './productsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    categories,
    products,
});

export default rootReducer;
