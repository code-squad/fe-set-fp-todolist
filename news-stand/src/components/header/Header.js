import React from 'react';
import HeaderTitle from './HeaderTitle';
import ToggleButton from './ToggleButton';
import NavigationButton from './NavigationButton';

const Header = ({props}) => {
	return (
		<div>
			<HeaderTitle></HeaderTitle>
			<ToggleButton></ToggleButton>
			<NavigationButton></NavigationButton>
		</div>
	);
}

export default Header;
