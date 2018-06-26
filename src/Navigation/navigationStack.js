import { StackNavigator } from 'react-navigation';

import login from '../Components/login'
import signUp from '../Components/signUp'
import profile from '../Components/profile'
import home from '../Components/home'

const navigator = StackNavigator({
	login:{
		screen: login
	},
	signUp:{
		screen: signUp
	},
	profile:{
		screen: profile
	},
	home: {
		screen: home
	}
});

export default navigator;