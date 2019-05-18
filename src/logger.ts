const chalk = require('chalk');

// tslint:disable: no-console

export class Logger {
    public static info(msg: string): void {
        console.log(msg);
    }

    public static error(msg: string): void {
        console.log(msg);
    }

    public static initLinterMessage(): void {
        console.log(chalk.green.bold('Linting staged files...'));
    }

    public static linterSuccessMessage(): void {
        console.log(chalk.green.bold('Linter successful!'));
    }

    public static linterFailureMessage(errorsAndWarnings: string[]): void {
        console.log(chalk.red.bold('Linting failed!'), 'List of issues:');
        errorsAndWarnings.forEach((errorOrWarning: string) => {
            if (/ERROR/.test(errorOrWarning)) {
                let formattedIfPossible = Logger.matchRegExpAndFormat(errorOrWarning, /ERROR/, (str: string) => chalk.red.bold(`[${str}]`));
                formattedIfPossible = Logger.findFileAndFormat(formattedIfPossible, chalk.red.bold);
                console.log(formattedIfPossible);
            }
            if (/WARNING/.test(errorOrWarning)) {
                let formattedIfPossible = Logger.matchRegExpAndFormat(errorOrWarning, /WARNING/, (str: string) =>
                    chalk.yellow.bold(`[${str}]`)
                );
                formattedIfPossible = Logger.findFileAndFormat(formattedIfPossible, chalk.yellow.bold);
                console.log(formattedIfPossible);
            }
        });
    }

    public static findFileAndFormat(errorOrWarning: string, formatter: (str: string) => string): string {
        const regExp = /[^\\/]+\.ts\[[0-9, ]+\]/;
        return Logger.matchRegExpAndFormat(errorOrWarning, regExp, formatter);
    }

    private static matchRegExpAndFormat(input: string, regExp: RegExp, formatter: (str: string) => string): string {
        if (regExp.test(input)) {
            const fileNameAndLineInfoMatch = regExp.exec(input);
            if (fileNameAndLineInfoMatch && fileNameAndLineInfoMatch.length > 0) {
                const fileNameAndLineInfo = fileNameAndLineInfoMatch[0];
                return input.replace(fileNameAndLineInfo, formatter(fileNameAndLineInfo));
            }
        }
        return input;
    }
}
