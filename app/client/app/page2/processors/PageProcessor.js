import path from 'path';
import fs from 'fs';

import deviceDetector from '../../../../server/utils/DeviceDetector';
import streamContent from './ServerSidePageProcessor';

let mobileCSS = '', tabletCSS = '', desktopCSS = '', manifestContentClientJS = '', clientCSSContent = '';

const getDeviceSpecificCSS = () => {
	let commonCSSFilePath = path.join(__dirname, '../../../../dist/assets/common.css');
	let mobileCSSFilePath = path.join(__dirname, '../../../../dist/assets/mobile.css');
	let tabletCSSFilePath = path.join(__dirname, '../../../../dist/assets/tablet.css');
	let desktopCSSFilePath = path.join(__dirname, '../../../../dist/assets/desktop.css');

	if (fs.existsSync(commonCSSFilePath)) {
		var commonCSSContent = fs.readFileSync(commonCSSFilePath, 'utf8');
		mobileCSS += commonCSSContent;
		tabletCSS += commonCSSContent;
		desktopCSS += commonCSSContent;
	}
	if (fs.existsSync(mobileCSSFilePath)) {
		const mobileCSSContent = fs.readFileSync(mobileCSSFilePath, 'utf8');
		mobileCSS += mobileCSSContent;
	}
	if (fs.existsSync(tabletCSSFilePath)) {
		const tabletCSSContent = fs.readFileSync(tabletCSSFilePath, 'utf8');
		tabletCSS += tabletCSSContent;
	}
	if (fs.existsSync(desktopCSSFilePath)) {
		const desktopCSSContent = fs.readFileSync(desktopCSSFilePath, 'utf8');
		desktopCSS += desktopCSSContent;
	}
};

let getPage2StaticAssets = () => {
	const manifestFilePath = path.join(__dirname, '../../../../../dist/manifest.json');
	if (fs.existsSync(manifestFilePath)) {
		let manifestContent = JSON.parse(fs.readFileSync(manifestFilePath, 'utf8'));
		manifestContentClientJS = manifestContent['page2_bundle.js'];
	}
	getDeviceSpecificCSS();
};

const page2Processor = function (req, res) {
	const device = deviceDetector(req.headers);
	if (device === 'mobile') {
		clientCSSContent = mobileCSS;
	} else if (device === 'tablet') {
		clientCSSContent = tabletCSS;
	} else {
		clientCSSContent = desktopCSS;
	}
	let params = {
		clientCSSContent: clientCSSContent,
		manifestContentClientJS: manifestContentClientJS,
		deviceType: device
	};
	res.type('html');
	streamContent(req, res, params);
};

export { page2Processor, getPage2StaticAssets }
