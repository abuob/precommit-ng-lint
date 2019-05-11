export function filterByFileExtension(filePaths: string[], allowedExtensions: string[]): string[] {
    const fileExtensionFilterRegex: RegExp = new RegExp('.*\.(' + allowedExtensions.join('|') + ')$');
    return filePaths.filter((filePath) => fileExtensionFilterRegex.test(filePath));
}
