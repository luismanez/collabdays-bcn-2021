'use strict';

const gulp = require('gulp');
const path = require('path');
const bundleAnalyzer = require('webpack-bundle-analyzer');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

if(process.argv.indexOf('--analyze') !== -1 ||
     process.argv.indexOf('dist') ||
       process.argv.indexOf('dev') !== -1)
       {

          build.configureWebpack.mergeConfig({
            additionalConfiguration: (generatedConfiguration) => {
              const lastDirName = path.basename(__dirname);
              const dropPath = path.join(__dirname, 'temp', 'stats');
              generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'static',
                reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
                generateStatsFile: true,
                statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
                logLevel: 'error'
              }));
          
              return generatedConfiguration; 
            }
          });
       }



/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));

