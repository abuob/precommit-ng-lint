export function getOptionsFromArguments(argv: string[]): IPrecommitNgLintOptions {
    const options = DEFAULT_OPTIONS;
    argv.forEach((arg) => {
        switch (parseArgumentToOption(arg)) {
            case "NONE":
                break;
            case "FIX_TRUE":
                options.fix = true;
                break;
            case "FIX_FALSE":
                options.fix = false;
                break;
            default:
                break;
        }
    });
    return options;
}

export function parseArgumentToOption(arg: string): optionType {
    arg = arg.trim();
    if (/^--fix(=true)?$/.test(arg)) {
        return "FIX_TRUE";
    }
    if (/^--fix=false$/.test(arg)) {
        return "FIX_FALSE";
    }
    return 'NONE';
}


export interface IPrecommitNgLintOptions {
    fix: boolean;
}

export const DEFAULT_OPTIONS: IPrecommitNgLintOptions = {
    fix: false
};

declare type optionType = 'NONE' | 'FIX_TRUE' | 'FIX_FALSE';
