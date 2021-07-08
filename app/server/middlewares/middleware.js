import { app, startServer } from '../utils/Express'
import healthRouter from "../endpoints/health/router"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from "path";
import express from "express";

let appContext = '/app';
let distDir = path.join(__dirname, '../../../dist/');
let staticAssetsPath = appContext + '/assets';
app.use(staticAssetsPath, express.static(distDir));

app.use(bodyParser.json())
app.use(cookieParser())
app.use(healthRouter)

export { startServer, app }
