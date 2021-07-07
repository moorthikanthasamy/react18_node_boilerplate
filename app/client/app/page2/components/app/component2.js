import React from 'react';
import { useSelector } from 'react-redux';
import './page2Styles.css';

const Component2 = () => {
	const { envConfig } = useSelector(state => state);
	return <React.Fragment>
		<div className='Button' {...envConfig}>Welcome to Page2</div>
	</React.Fragment>
}


export default Component2;
