import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header/Header';
import Content from './components/Content';

const App = () => {
	const [newsData, setNewsData] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	// 초기 데이터 셋팅
	const fetchNewsData = async () => {
		const response = await fetch("http://localhost:8080");
		const data = await response.json();

		
		setNewsData(data);
	};

	useEffect( () => {
		fetchNewsData();
	}, []);

	return (
		<Router>
			<Header></Header>
			<Content newsData={newsData}></Content>
		</Router>
	);
};

export default App;
