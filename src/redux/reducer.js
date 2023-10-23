import { createReducer } from '@reduxjs/toolkit';
import { addTodo, deleteTodo, updateTodo } from './action';
import { nanoid } from 'nanoid';

const initialStateTodo = localStorage.getItem('todo')
	? JSON.parse(localStorage.getItem('todo'))
	: [];

const todoReducer = createReducer(initialStateTodo, (builder) => {
	builder
		.addCase(addTodo, (state, action) => {
			const id = `todo-${nanoid(16)}`;
			const payloadData = action.payload.data;
			const newTodo = { id, ...payloadData };

			state.push(newTodo);
			localStorage.setItem('todo', JSON.stringify(state));
		})
		.addCase(updateTodo, (state, action) => {
			const payloadId = action.payload.id;
			const payloadData = action.payload.data;
			const index = state.findIndex((todo) => todo.id === payloadId);

			state[index] = { ...state[index], ...payloadData };
			localStorage.setItem('todo', JSON.stringify(state));
		})
		.addCase(deleteTodo, (state, action) => {
			const payloadId = action.payload.id;
			const index = state.findIndex((todo) => todo.id === payloadId);

			state.splice(index, 1);
			localStorage.setItem('todo', JSON.stringify(state));
		});
});

export { todoReducer };
