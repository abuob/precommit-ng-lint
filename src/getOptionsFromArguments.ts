export const DEFAULT_OPTIONS: IPrecommitNgLintOptions = {
    fix: false,
    angularConfigName: 'angular.json'
};

export function getOptionsFromArguments(argv: string[]): IPrecommitNgLintOptions {
    const options = Object.assign( {}, DEFAULT_OPTIONS);
    argv.forEach((arg) => {
        let argOption = parseArgumentToOption(arg);
        switch (argOption.argType) {
            case "INVALID":
                break;
            case "FIX":
                options.fix = argOption.argValue;
                break;
            case "ANGULAR_CONFIG":
                options.angularConfigName = argOption.argValue;
                break;
            default:
                break;
        }
    });
    return options;
}

export function parseArgumentToOption(arg: string): IOption {
    arg = arg.trim();
    if (/^--fix(=true)?$/.test(arg)) {
        return {argType: "FIX", argValue: true};
    }
    if (/^--fix=false$/.test(arg)) {
        return {argType: "FIX", argValue: false};
    }
    if (/^--angularConfig=.+\.json$/.test(arg)) {
        return {argType: "ANGULAR_CONFIG", argValue: arg.replace('--angularConfig=', '')};
    }
    return {argType: "INVALID", argValue: null};
}


export interface IPrecommitNgLintOptions {
    fix: boolean;
    angularConfigName: string;
}

export interface IOption {
    argType: argumentType;
    argValue: any;
}

declare type argumentType = 'INVALID' | 'FIX' | 'ANGULAR_CONFIG';
