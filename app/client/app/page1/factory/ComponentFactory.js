import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Component1 from '../components/app/component1';

const staticAssetsPath = '/app/assets';
export default class ComponentFactory {
	static getHTMLHead({ css }) {
		return `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<meta name="format-detection" content="telephone=no">
					<meta http-equiv="x-dns-prefetch-control" content="on">
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
					<title>Welcome to Page1</title>
					<style>${css}</style>
				</head>
				<body>`;
	};

	static getContentComponent(store) {
		let htmlString = renderToString(<Provider store={store}><Component1 /></Provider>);
		return `<div id="root">${htmlString}</div>`;
	}

	static getBottomContent(store, params) {
		let page1clientjs = params.clientjs;
		return `<script>
						window.__APP_INITIAL_STATE__ = ${JSON.stringify(store.getState())};
					</script>
					<script src="${staticAssetsPath}/${page1clientjs}" defer></script>
		      	</body>
		    </html>
		`;
	};
}
