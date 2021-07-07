import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import https from "https";
import cluster from "cluster";

const app = express();
const PORT = process.env.PORT || 3000;
/** 
 * Below method will be involked in debug and start app mode
 */
const createAppServer = (expressApp, callback) => {
   let securityKey = path.join(__dirname, "key path here");
   let securityCert = path.join(__dirname, "cert path here");
   let credentials = {
      key: fs.readFileSync(securityKey),
      cert: fs.readFileSync(securityCert)
   };
   https.createServer(credentials, expressApp).listen(PORT, function () {
      console.log(`Fork ${process.pid} is running in ${PORT} port`);
      callback();
   });
}
const nonClusterApp = (expressApp, callback) => {
   expressApp.listen(PORT, function () {
      console.log(`Fork ${process.pid} is running in ${PORT} port`);
      callback();
   });
}

const clusterApp = (expressApp, callback) => {
   if (cluster.isMaster) {
      const { ENV_CPU_CORES, ENV_SERVER } = process.env;
      let numCPUs = os.cpus().length;
      if (ENV_SERVER === 'local') {
         numCPUs = 1
      }
      if (typeof ENV_CPU_CORES !== 'undefined' && ENV_CPU_CORES) {
         numCPUs = ENV_CPU_CORES;
      }
      console.log(`Master ${process.pid} is running`);
      for (let i = 0; i < numCPUs; i++) {
         cluster.fork();
      }
      cluster.on("exit", () => {
         cluster.fork();
      });
   } else {
      if (process.env.ENV_SERVER === "local" || process.env.ENV_ENABLE_HTTPS === "true") {
         createAppServer(expressApp, callback);
      } else {
         nonClusterApp(expressApp, callback);
      }
   }
}
let startServer = (expressApp, callback) => {
   if (process.env.NODE_ENV === 'test') {
      nonClusterApp(expressApp, callback)
   } else {
      clusterApp(expressApp, callback);
   }
};

export { app, startServer };
