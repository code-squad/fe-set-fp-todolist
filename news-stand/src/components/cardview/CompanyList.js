import React from 'react';
import { Link } from "react-router-dom";

import {CARD_URL} from '../../constant';


const CompanyList = ({companyInfoList}) => {
	return (
		<div className="">
			<ul>
			{
				companyInfoList.map(item => {
					return (
						<li key={item.id}>
							<Link to={`${CARD_URL}/${item.id}`}>{item.company}</Link>
						</li>
						)
				})
			}
			</ul>
		</div>
	);
}

export default CompanyList;
