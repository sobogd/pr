import { combineReducers } from 'redux';
import categories from './categoriesReducer';
import products from './productsReducer';
import slides from './slidesReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    categories,
    products,
    slides,
});

export default rootReducer;
