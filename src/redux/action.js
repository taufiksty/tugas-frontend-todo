import { createAction } from '@reduxjs/toolkit';

const addTodo = createAction('ADD_TODO');
const updateTodo = createAction('UPDATE_TODO');
const deleteTodo = createAction('DELETE_TODO');

export { addTodo, deleteTodo, updateTodo };
