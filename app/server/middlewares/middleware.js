import { app, startServer } from '../utils/Express'
import healthRouter from "../endpoints/health/router"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from "path";
import express from "express";

let appContext = '';
let distDir = path.join(__dirname, '../../../dist/assets');
let staticAssetsPath = appContext + '/v1/assets';

app.use(staticAssetsPath, express.static(distDir));

app.use(bodyParser.json())
app.use(cookieParser())
app.use(healthRouter)

export { startServer, app }
