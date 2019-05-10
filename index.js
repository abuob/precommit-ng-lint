#! /usr/bin/env node

const sgf = require('staged-git-files');
const npmWhich = require('npm-which')(process.cwd());
const execSync = require('child_process').execSync;

sgf(['ACM'], (err, results) => {
    npmWhich('ng', (err, ngPath) => {

        const ngLintFileArgs = results
            .map((result) => result.filename)
            .filter((filename) => /.*\.(js|ts)$/.test(filename))
            .map((filename) => '--file=' + filename)
            .join(' ');

        const ngLintCommand = ngPath + ' lint ' + ngLintFileArgs;

        console.log(ngLintCommand);
        try {
            execSync(ngLintCommand, {stdio: 'inherit'});
            console.log('Linting successful!')
        } catch(err) {
            process.exit(1);
        }
    });
});
