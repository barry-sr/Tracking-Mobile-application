import {combineReducers} from 'redux';
import region from './location'
import Nav from './navReducer'
import UserData from './userData'
import SignUpData from './signUpData'
const rootReducer= combineReducers ({
	region,
	Nav,
	UserData,
	SignUpData
});

export default rootReducer;