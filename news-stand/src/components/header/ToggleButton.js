import React from 'react';
import { Link } from "react-router-dom";

import Button from '../common/Button';

import {CARD_URL, LIST_URL} from '../../constant';

const ToggleButton = ({props}) => {
	return (
		<>
			<Link to={`${CARD_URL}`}><Button text="card"></Button></Link>
			<Link to={`${LIST_URL}`}><Button text="list"></Button></Link>
		</>
	);
}

export default ToggleButton;
