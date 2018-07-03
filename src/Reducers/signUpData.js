const initial = {}

export default function getSignUpData(state = initial, action){
	 switch(action.type) {
        case 'GET_SIGN_UP_DATA':
        return{
        	...state,
        	data: action.data
        };
      	default: 
      	return state
      }
} 