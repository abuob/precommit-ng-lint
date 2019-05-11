#! /usr/bin/env node

import {getAngularProjects} from "./src/getAngularProjects";

const sgf = require('staged-git-files');
const npmWhich = require('npm-which')(process.cwd());
const execSync = require('child_process').execSync;
const findParentDir = require('find-parent-dir');


getAngularProjects(process.cwd());

//
// findParentDir(__dirname, 'package.json', (err: any, dir: any) => {
//     console.log('lulz: ', dir);
// });
//
// sgf(['ACM'], (err: any, results) => {
//     console.log('Linting staged files...');
//     npmWhich('ng', (err, ngPath) => {
//
//         const ngLintFileArgs = results
//             .map((result) => result.filename)
//             .filter((filename) => /.*\.(js|ts)$/.test(filename))
//             //.map((filename) => '--file=' + filename)
//             .join(' ');
//         console.log('files: ', ngLintFileArgs);
//
//         const ngLintCommand = ngPath + ' lint --files ' + ngLintFileArgs;
//         console.log(ngLintCommand);
//         let result;
//         try {
//             execSync(ngLintCommand, { stdio: 'pipe'});
//             console.log('Linting successful!')
//         } catch(err) {
//             console.log(err.stderr.toString());
//             process.exit(1);
//         }
//     });
// });
