#! /usr/bin/env node

const sgf = require('staged-git-files');
const npmWhich = require('npm-which')(process.cwd());
const execa = require('execa');

import { filterByFileExtension } from './src/filterByFileExtension';
import { getErrorsAndWarning } from './src/getErrorsAndWarnings';
import { getOptionsFromArguments } from './src/getOptionsFromArguments';
import { Logger } from './src/logger';
import { FilesUtil } from './src/util/files.util';
import { INgLintCommand, NgCommandUtil } from './src/util/ngCommand.util';
import { NgProjectUtil } from './src/util/ngProject.util';

const options = getOptionsFromArguments(process.argv.slice(2));

sgf(['ACM'], (sgfErr: any, results: IStagedGitFilesResult[]) => {
    const stagedFilePaths: string[] = results.map(file => file.filename);
    const filteredFilePaths = filterByFileExtension(stagedFilePaths, ['ts']);

    const angularProjects = NgProjectUtil.getAngularProjects(process.cwd(), options);
    const projectsAndTheirFiles = FilesUtil.getStagedFilesPerProject(filteredFilePaths, angularProjects);

    npmWhich('ng', (npmWhichErr: any, ngPath: string) => {
        Logger.info('Linting staged files...');

        let errorsAndWarnings: string[] = [];

        projectsAndTheirFiles.forEach(projectAndItsFiles => {
            const ngLintCommand: INgLintCommand = NgCommandUtil.getNgLintCommand(projectAndItsFiles, options);

            try {
                execa.sync(ngPath, ['lint', ngLintCommand.projectName, ...ngLintCommand.options, ...ngLintCommand.files], {
                    stdio: 'pipe'
                });
            } catch (e) {
                const rawOutput = e.stdout.toString() + e.stderr.toString();
                errorsAndWarnings = errorsAndWarnings.concat(getErrorsAndWarning(rawOutput));
            }
        });

        if (errorsAndWarnings.length === 0) {
            Logger.info('Linter successful!');
        } else {
            Logger.error('Linting failed! List of issues:');
            errorsAndWarnings.forEach(errorOrWarning => {
                Logger.info(errorOrWarning);
            });
            process.exit(1);
        }
    });
});

interface IStagedGitFilesResult {
    filename: string;
    status: 'Modified' | 'Changed' | 'Added';
}
