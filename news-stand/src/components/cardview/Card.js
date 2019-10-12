import React from 'react';

const Card = ({newsItems}) => {

	return (
		<>
		{
			newsItems.map(item => {
				return (
				<div className="">
					<div>
							<img src={item.thumbnews.imageUrl}></img>
							<ul>
								{item.newslist.map(headline => <li>{headline}</li>)}
							</ul>
					</div>
				</div>
				)
			})
		}
		</>
	);
}

export default Card;
