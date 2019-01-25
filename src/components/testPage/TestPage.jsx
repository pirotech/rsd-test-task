import React from 'react';
// components
// style
import './TestPage.scss';


const TestPage = () => {
	const text = 'В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!';
	const part = 'В чащах юга';

	return (
		<div className="test-page">

			<div className="row">
				<h1 className="el title">Заголовки</h1>
			</div>
			<div className="col">
				<h1 className="el">Заголовок 1</h1>
				<h2 className="el">Заголовок 2</h2>
				<h5 className="el">Заголовок 5</h5>
			</div>

			<div className="row">
				<h1 className="el title">Наборный текст</h1>
			</div>
			<div className="col">
				<p className="el">{ text }</p>
				<span className="caption el">{ text }</span>
				<span className="label el">{ text }</span>
				<span className="placeholder el">{ text }</span>
				<a href="#" className="el">{ part }</a>
			</div>

		</div>
	);
};

export default TestPage;
