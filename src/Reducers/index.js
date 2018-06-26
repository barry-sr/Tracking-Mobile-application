import {combineReducers} from 'redux';
import region from './location'
import Nav from './navReducer'
import UserData from './userData'
const rootReducer= combineReducers ({
	region,
	Nav,
	UserData
});




export default rootReducer;