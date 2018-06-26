
const initialState= {}

export default function getLoc (state = initialState, action){
      switch(action.type) {
      	case 'GET_CURRENT_LOCACTION':
      	return {  
      		...state,
      		region: action.position
        } 
      	default: 
      	return state
      }
   }