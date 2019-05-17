# precommit-ng-lint

precommit-ng-lint allows you to invoke `ng lint` on all staged files in your project, and only your staged files. 
It's intended to be used as precommit-hook.

Angular allows you to have different linter rules for each project, precommit-ng-lint takes care that the right linter-rules are applied for all files.

## Usage
It can be used directly with [husky](https://github.com/typicode/husky) or in combination with [lint-staged](https://github.com/okonet/lint-staged).

## Options

| Option  |Default | Effect |
| :------------------------------------ |----------| ------------- |
| `--fix` or `--fix=true`, `--fix=false`   | `false` | Adds the `--fix` parameter to `ng lint`  |
| `--angularConfig=<fileName>.json`  | `angular.json` | If your `angular.json`-file has a different name. Depending on your setup, this might allow you usage for Angular -5 (with `angular-cli.json`). No guarantees given, mostly untested for older versions.  |

## 👷 Work in progress 👷
This is a work in progress. In it's current state, it should work under Angular 6+ on Linux, for the most part on Windows too. 
If you encounter any issues, please let me know.

## Upcoming features
- [x] Option to enable `--fix`
- [ ] Cleanup output (colored, chalk)
- [ ] Option for debug-output
- [ ] Handle some of the weird `ng lint --files...` bugs, such as https://github.com/angular/angular-cli/issues/13668
