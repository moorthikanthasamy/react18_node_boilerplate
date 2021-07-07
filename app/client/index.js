import { app, startServer } from "../server/middlewares/middleware"

import { page1Processor, getPage1StaticAssets } from './app/page1/processors/PageProcessor';
import { page2Processor, getPage2StaticAssets } from './app/page2/processors/PageProcessor';

let page1URL = '/v1/page1';
app.get(page1URL, (req, res) => {
   page1Processor(req, res);
});
let page2URL = '/v1/page2';
app.get(page2URL, (req, res) => {
   page2Processor(req, res);
});


const serverStartupCallback = () => {
   // axiosLogging('BPOutBoundResponse');
   getPage1StaticAssets();
   getPage2StaticAssets();
};

startServer(app, function () {
   serverStartupCallback();
});