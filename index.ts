#! /usr/bin/env node

import {getAngularProjects} from "./src/getAngularProjects";
import {getStagedFilesPerProject} from "./src/getStagedFilesPerProject";
import {filterByFileExtension} from "./src/filterByFileExtension";

const sgf = require('staged-git-files');
const npmWhich = require('npm-which')(process.cwd());
const execSync = require('child_process').execSync;


sgf(['ACM'], (err: any, results: IStagedGitFilesResult[]) => {
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
    const stagedFilePaths: string[] = results.map((file) => file.filename);
    const filteredFilePaths = filterByFileExtension(stagedFilePaths, ['ts']);
    const angularProjects = getAngularProjects(process.cwd());
    const filesPerProject = getStagedFilesPerProject(filteredFilePaths, angularProjects);


});

interface IStagedGitFilesResult {
    filename: string, status: 'Modified' | 'Changed' | 'Added'
}
