import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDeleteForever, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/action';
import Modal from './Modal';

function Todo({ id, children, check }) {
	const [onUpdate, setOnUpdate] = useState(false);
	const [inputUpdate, setInputUpdate] = useState(children);
	const [checkUpdate, setCheckUpdate] = useState(check);
	const [openModalDelete, setOpenModalDelete] = useState(false);

	const dispatch = useDispatch();

	const inputRef = useRef(null);

	function onKeyEnterWhenTypeInput(e) {
		if (e.key === 'Enter') {
			setOnUpdate(false);
		}
	}

	function onDeleteTodo() {
		dispatch(deleteTodo({ id }));
		setOpenModalDelete(false);
	}

	useEffect(() => {
		if (onUpdate) {
			inputRef.current.focus();
		} else {
			const data = { todo: inputUpdate, check: checkUpdate };
			dispatch(updateTodo({ id, data }));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onUpdate, checkUpdate]);

	return (
		<>
			<div className="flex justify-between p-3 md:p-4 space-x-6 rounded border border-zinc-400">
				<div className="flex w-full items-center space-x-3">
					<div
						onClick={() => setCheckUpdate(!checkUpdate)}
						className="w-8 aspect-square border border-zinc-400 cursor-pointer">
						{check && (
							<MdCheck className="w-8 h-8 text-zinc-700 cursor-pointer" />
						)}
					</div>
					<input
						type="text"
						name="todo-1"
						id="todo-1"
						ref={inputRef}
						value={inputUpdate}
						onChange={(e) => setInputUpdate(e.target.value)}
						onBlur={() => setOnUpdate(false)}
						onKeyPress={onKeyEnterWhenTypeInput}
						className={`grow text-xl font-medium bg-white text-zinc-700 outline-none focus:border-b focus:border-b-zinc-400 md:text-xl ${
							checkUpdate && 'line-through text-zinc-400'
						}`}
						disabled={!onUpdate}
					/>
				</div>
				<div className="flex items-center space-x-1">
					<MdModeEdit
						onClick={() => setOnUpdate(true)}
						className={`w-8 h-8 text-zinc-700 cursor-pointer hover:text-blue-300 ${
							onUpdate && 'text-blue-300'
						}`}
					/>
					<MdDeleteForever
						onClick={() => setOpenModalDelete(true)}
						className="w-8 h-8 text-zinc-700 cursor-pointer hover:text-red-300"
					/>
				</div>
			</div>
			{openModalDelete && (
				<Modal
					onDelete={onDeleteTodo}
					onCancel={() => setOpenModalDelete(false)}
				/>
			)}
		</>
	);
}

export default Todo;

Todo.propTypes = {
	id: PropTypes.string,
	children: PropTypes.string,
	check: PropTypes.bool,
};
