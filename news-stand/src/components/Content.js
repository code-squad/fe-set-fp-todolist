import React from 'react';

import CardView from './CardView';
import ListView from './ListView';

const Content = ({props}) => {
	return (
		<div>
			<CardView></CardView>
			<ListView></ListView>
		</div>
	);
}

export default Content;
