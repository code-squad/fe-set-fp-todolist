import React from 'react';
import { Route, Switch } from "react-router-dom";

import CardView from './cardview/CardView';
import ListView from './listview/ListView';
import NewsContentContext from '../context/NewsContentContext';

import {CARD_URL, LIST_URL} from '../constant';

const Content = ({newsData}) => {
	const newsContentData = {
			newsData
		}

	return (
		<NewsContentContext.Provider value={newsContentData}>
			<div>
				<Switch>
					<Route path={`${CARD_URL}/:id`} component={CardView}></Route>
					<Route path={`${LIST_URL}`} component={ListView}></Route>
					<Route component={CardView}></Route>
				</Switch>
			</div>
		</NewsContentContext.Provider>
	);
}

export default Content;
