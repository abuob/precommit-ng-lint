export function getErrorsAndWarning(rawOutput: string): string[] {
    return rawOutput
        .split('\n')
        .filter((line: string) => /(ERROR|WARNING)/.test(line))
        .map((errorOrWarning: string) => [errorOrWarning.trim()])
        .reduce((acc, curr) => acc.concat(curr), []);
}
