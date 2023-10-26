import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Status from './components/Status';
import Todo from './components/Todo';
import { addTodo } from './redux/action';
import { DarkModeContext } from './context/DarkMode';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

function App() {
	const [inputTodo, setInputTodo] = useState('');
	const [filter, setFilter] = useState('all');

	const todoData = useSelector((state) => state.todo);
	const [todo, setTodo] = useState(todoData);

	const dispatch = useDispatch();

	function addTodoHandler(e) {
		e.preventDefault();
		const data = { todo: inputTodo, check: false };
		dispatch(addTodo({ data }));
		setInputTodo('');
	}

	useEffect(() => {
		if (filter === 'all') {
			setTodo(todoData);
		} else {
			const checkTodo = filter === 'completed' ? true : false;
			const filteredTodo = todoData.filter((todo) => todo.check === checkTodo);
			setTodo(filteredTodo);
		}
	}, [filter, todoData]);

	const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

	useEffect(() => {
		const html = document.querySelector('html');
		if (isDarkMode) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<main className="mx-8 md:mx-[600px] flex flex-col items-center my-36">
			<h1 className="font-bold text-3xl md:text-5xl self-start md:self-center text-zinc-700 dark:text-white">
				What&apos;s the plan for today?
			</h1>
			<form className="mt-16 flex justify-between w-full space-x-3">
				<input
					type="text"
					name="todo"
					id="todo"
					onChange={(e) => setInputTodo(e.target.value)}
					value={inputTodo}
					placeholder="What to do"
					className="p-2 md:p-3 rounded border border-zinc-400 outline-zinc-400 text-zinc-700 grow md:text-xl dark:bg-[#1E1E1E] dark:text-white"
				/>
				<button
					type="submit"
					onClick={addTodoHandler}
					className="bg-blue-400 text-white font-semibold py-2 px-4 md:px-6 rounded cursor-pointer hover:bg-blue-300 md:text-xl">
					Add
				</button>
			</form>

			{/* <FilterStatus> */}
			<div className="mt-14 flex justify-between items-center w-full">
				<div className="flex space-x-3">
					<Status
						selected={filter === 'all' ? true : false}
						onChoose={() => setFilter('all')}>
						ALL
					</Status>
					<Status
						selected={filter === 'active' ? true : false}
						onChoose={() => setFilter('active')}>
						ACTIVE
					</Status>
					<Status
						selected={filter === 'completed' ? true : false}
						onChoose={() => setFilter('completed')}>
						COMPLETED
					</Status>
				</div>
				<div className="border border-zinc-700 dark:border-white rounded-full p-2 cursor-pointer hover:opacity-80">
					{isDarkMode ? (
						<MdOutlineDarkMode
							className="w-8 h-8 text-zinc-700 dark:text-white"
							onClick={() => setIsDarkMode(!isDarkMode)}
						/>
					) : (
						<MdOutlineLightMode
							className="w-8 h-8 text-zinc-700"
							onClick={() => setIsDarkMode(!isDarkMode)}
						/>
					)}
				</div>
			</div>
			{/* </FilterStatus> */}

			{/* <ListTodo> */}
			<div className="mt-14 w-full space-y-4">
				{todo.map((todo) => (
					<Todo
						key={todo.id}
						id={todo.id}
						check={todo.check}>
						{todo.todo}
					</Todo>
				))}
			</div>
			{/* </ListTodo> */}
		</main>
	);
}

export default App;
