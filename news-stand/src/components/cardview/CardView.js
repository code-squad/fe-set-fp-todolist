import React, { useContext } from 'react';

import CompanyList from "./CompanyList";
import Card from "./Card";
import NewsContentContext from "../../context/NewsContentContext";


const findById = (datas, id) => {
	return datas.filter(data => data.id === id)
}

const makeCompanyInfo = (datas) => {
	return datas.map(data => {
		return {id : data.id, company: data.company}
	})
}

const CardView = ({match}) => {

	const {newsData} = useContext(NewsContentContext);
	const id = match.params.id;

	return (
		<div>
			<CompanyList companyInfoList={makeCompanyInfo(newsData)}></CompanyList>
			<Card newsItems={findById(newsData, id)}></Card>
		</div>
	);
}

export default CardView;
