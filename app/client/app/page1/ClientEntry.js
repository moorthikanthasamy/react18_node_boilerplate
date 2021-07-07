import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStoreWithInitialState from './store';
import Component1 from './components/app/component1';

let appInitState = window.__APP_INITIAL_STATE__ || {};

//create a store with initial state.
let store = createStoreWithInitialState(appInitState);

// remove the global reference
delete window.__APP_INITIAL_STATE__;

// the below line is used for BTF rendering
window.store = store;

const initClientSideRender = (store) => {
	render(<Provider store={store}>
		<Component1 />
	</Provider>, document.getElementById('page-content'));
};

initClientSideRender(store);
