import AppNavigator from '../Navigation/navigationStack';
import { AsyncStorage } from 'react-native';

// let user = AsyncStorage.getItem('user');
// var flag= false;
// 	AsyncStorage.getItem('user', (error, data)=>{
// 			if(error){
// 				console.log(flag);
// 				flag = false;
// 			} else {
// 				flag = true;
// 				console.log(flag);
// 			}
// 		});


// const initialState = AppNavigator.router.getStateForAction(
// flag ? AppNavigator.router.getActionForPathAndParams("home") :  AppNavigator.router.getActionForPathAndParams("login")
// );

const initialState = AppNavigator.router.getStateForAction(
AppNavigator.router.getActionForPathAndParams("profile")
);

const navReducer = (state= initialState, action) => {
	const newState = AppNavigator.router.getStateForAction(action, state);
	return newState || state;
};

export default navReducer;