#! /usr/bin/env node

const sgf = require('staged-git-files');
const npmWhich = require('npm-which')(process.cwd());
const execa = require('execa');

import {NgProjectUtil} from "./src/ngProject.util";
import {FilesUtil} from "./src/files.util";
import {filterByFileExtension} from "./src/filterByFileExtension";
import {NgCommandUtil, INgLintCommand} from "./src/ngCommand.util";
import {getErrorsAndWarning} from "./src/getErrorsAndWarnings";
import {getOptionsFromArguments} from "./src/getOptionsFromArguments";

const options = getOptionsFromArguments(process.argv.slice(2));

sgf(['ACM'], (err: any, results: IStagedGitFilesResult[]) => {
    const stagedFilePaths: string[] = results.map((file) => file.filename);
    const filteredFilePaths = filterByFileExtension(stagedFilePaths, ['ts']);

    const angularProjects = NgProjectUtil.getAngularProjects(process.cwd());
    const projectsAndTheirFiles = FilesUtil.getStagedFilesPerProject(filteredFilePaths, angularProjects);

    npmWhich('ng', (err: any, ngPath: string) => {
        console.log('Linting staged files...');

        let errorsAndWarnings: string[] = [];

        projectsAndTheirFiles.forEach((projectAndItsFiles) => {

            const ngLintCommand: INgLintCommand = NgCommandUtil.getNgLintCommand(projectAndItsFiles, options);

            try {
                execa.sync(ngPath, ['lint', ngLintCommand.projectName, ...ngLintCommand.options, ...ngLintCommand.files], {stdio: 'pipe'});
            } catch (e) {
                const rawOutput = e.stdout.toString() + e.stderr.toString();
                errorsAndWarnings = errorsAndWarnings.concat(getErrorsAndWarning(rawOutput));
            }
        });

        if (errorsAndWarnings.length === 0) {
            console.log('Linter successful!');
        } else {
            console.error('Linting failed! List of issues:');
            errorsAndWarnings.forEach((errorOrWarning) => {
                console.log(errorOrWarning);
            });
            process.exit(1);
        }
    });


});

interface IStagedGitFilesResult {
    filename: string,
    status: 'Modified' | 'Changed' | 'Added'
}
