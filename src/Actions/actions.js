import {
  GET_SIGN_UP_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_CURRENT_LOCACTION,
 } from './constants'

import { AsyncStorage } from 'react-native';

var id;

export function getSignUpData(data){
	return{
		type: GET_SIGN_UP_DATA,
		data
	}
}


export function getUserData(){
	return (dispatch)=>{
		AsyncStorage.getItem('user', (error, data)=>{
			if(error){
				dispatch(getUserDatafail(error));
			} else{
				dispatch(getUserDatasucces(JSON.parse(data)));
			}

		});

	}
}


function getUserDatasucces(data){
	return{
		type: GET_USER_DATA_SUCCESS,
		data
	}
  
}

function getUserDatafail(error){
	return {
		type: GET_USER_DATA_FAIL,
		error
	}
}

export function getCurrentLocation(){
	return(dispatch)=>{
		   navigator.geolocation.getCurrentPosition(
		   	(position) => {
				dispatch({
					type: GET_CURRENT_LOCACTION,
					position
				});	  

		},
		 (error) => alert(JSON.stringify(error)),
		{enableHighAccurracy: true, timeout: 20000, maximumAge: 1000}
		);

	   navigator.geolocation.watchPosition((position)=>{
	    	dispatch({
	    		type: GET_CURRENT_LOCACTION,
	    		position
	    	});
	    	console.log('watchPosition', position);
	    }, 
	    (error)=>  alert(JSON.stringify(error)), 
	    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1},);	   
	}
}


