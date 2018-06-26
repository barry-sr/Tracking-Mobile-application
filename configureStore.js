import {createStore, applyMiddleware} from 'redux';

import app from './src/Reducers'
import thunk from 'redux-thunk'

export default function configureStore() {
	let sotre= createStore(app, applyMiddleware(thunk))
	return sotre
}