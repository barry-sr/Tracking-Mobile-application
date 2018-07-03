const initial = {}

export default function getUserData(state = initial, action){
	 switch(action.type) {
        case 'GET_USER_DATA_SUCCESS':
        return{
        	...state,
        	data: action.data
        };
        case 'GET_USER_DATA_FAIL':
        return{
        	...state,
        	data: action.error
        }
      	default: 
      	return state
      }
} 