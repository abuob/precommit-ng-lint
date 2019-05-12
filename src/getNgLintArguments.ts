import {IFilesPerProject} from "./getStagedFilesPerProject";

export function getNgLintArguments(filesPerProjectArray: IFilesPerProject[]): INgLintArguments[] {
    return filesPerProjectArray.map((filesPerProject) => {
        return {
            projectName: filesPerProject.project.name,
            options: '',
            files: filesPerProject.files
                .map((filePath) => `--files ${filePath}`)
                .join(' ')
        }
    });
}

/**
 * Provides all information to call `ng lint`:
 * ng lint <projectName> <options> <files>
 */
export interface INgLintArguments {
    projectName: string;
    options: string;
    files: string;
}
