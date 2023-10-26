import PropTypes from 'prop-types';

function Modal({ onDelete, onCancel }) {
	return (
		<div className="fixed -top-4 left-0 flex justify-center items-center bg-opacity-10 dark:bg-opacity-50 bg-black h-screen w-full">
			<div className="bg-white dark:bg-[#1E1E1E] p-10 rounded space-y-6">
				<h3 className="md:text-xl dark:text-white">
					Are you want to delete this todo?
				</h3>
				<div className="flex justify-evenly">
					<button
						onClick={onDelete}
						className="bg-red-400 hover:bg-red-300 text-white md:text-xl py-1 px-7 rounded cursor-pointer">
						Yes
					</button>
					<button
						onClick={onCancel}
						className="bg-blue-400 hover:bg-blue-300 text-white md:text-xl py-1 px-7 rounded cursor-pointer">
						No
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;

Modal.propTypes = {
	onDelete: PropTypes.func,
	onCancel: PropTypes.func,
};
