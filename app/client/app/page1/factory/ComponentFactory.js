import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Component1 from '../components/app/component1';

let appContext = '';
const staticAssetsPath = appContext + '/v1/assets';

export default class ComponentFactory {
	static getHTMLHead() {
		return `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0">
					<meta name="format-detection" content="telephone=no">
					<meta http-equiv="x-dns-prefetch-control" content="on">
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
					<title>Welcome to Page1</title>
				</head>
				<body>`;
	};

	static getContentComponent(store) {
		let htmlString = renderToString(<Provider store={store}><Component1 /></Provider>);
		return `<div id="root">${htmlString}</div>`;
	}

	static getBottomContent(store, params) {
		let manifestContentClientJS = params.manifestContentClientJS;
		return `<script>
						window.__APP_INITIAL_STATE__ = ${JSON.stringify(store.getState())};
					</script>
					<script src="${staticAssetsPath}/${manifestContentClientJS}" defer></script>
		      	</body>
		    </html>
		`;
	};
}
