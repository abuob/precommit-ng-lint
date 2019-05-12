# precommit-ng-lint

precommit-ng-lint allows you to invoke `ng lint` on all staged files in your project, and only your staged files. 
It's intended to be used as precommit-hook.

Angular allows you to have different linter rules for each project, precommit-ng-lint takes care that the right linter-rules are applied for all files.

## Usage
It can be used directly with [husky](https://github.com/typicode/husky) or in combination with [lint-staged](https://github.com/okonet/lint-staged).

## ¡Work in progress! 
This is a work in progress. In it's current state, it should work under Angular 6+ on Linux. 
If you encounter any issues, please let me know.

