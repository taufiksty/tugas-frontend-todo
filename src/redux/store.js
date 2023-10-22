import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './reducer';

const store = configureStore({
	reducer: {
		todo: todoReducer,
	},
});

// store.subscribe(() => {
// 	console.log('store change :', store.getState());
// });

export default store;
