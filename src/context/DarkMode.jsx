import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DarkModeContext = createContext({
	isDarkMode: false,
	setIsDarkMode: () => {},
});

const DarkModeContextProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export default DarkModeContextProvider;

DarkModeContextProvider.propTypes = {
	children: PropTypes.node,
};
