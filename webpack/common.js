const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

const server_config = {
   entry: {
      ['server-bundle']: "./app/client/index"
   },
   // devtool: 'source-map',
   externalsPresets: { node: true }, // ignore built-in modules like path, fs, etc.
   externals: [nodeExternals()], // ignore all modules in node_modules folder
   context: path.resolve(__dirname, '../'),
   node: {
      global: false,
      __filename: true,
      __dirname: true,
   }
};

const client_config = {
   entry: {
      page1_bundle: ["./app/client/app/page1/ClientEntry.js"],
      page2_bundle: ["./app/client/app/page2/ClientEntry.js"]
   },
   plugins: [
      new WebpackManifestPlugin({
         map: function (files) {
            if (files.path.includes('server-bundle')) {
               files.path = files.name
            } else if (files.path.includes('auto')) {
               files.path = files.path.substr(files.path.indexOf('auto') + 4, files.path.length)
            }
            return files;
         }
      })
   ]
};

module.exports = [server_config, client_config]