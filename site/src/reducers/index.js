import { combineReducers } from 'redux';
import slides from './slidesReducer';
import categories from './categoriesReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    slides,
    categories,
});

export default rootReducer;
