import PropTypes from 'prop-types';

function FilterStatus({ children, selected, onChoose }) {
	return (
		<div
			onClick={onChoose}
			className={`${
				selected ? 'bg-emerald-500' : 'bg-zinc-400'
			} py-1 px-2 rounded-full text-white font-semibold cursor-pointer hover:opacity-80`}>
			{children}
		</div>
	);
}

export default FilterStatus;

FilterStatus.propTypes = {
	children: PropTypes.string,
	selected: PropTypes.bool,
	onChoose: PropTypes.func,
};
