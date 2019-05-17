import {IFilesPerProject} from "./getStagedFilesPerProject";
import {IPrecommitNgLintOptions} from "./getOptionsFromArguments";

export function getNgLintCommand(projectAndItsFiles: IFilesPerProject, precommitNgLintOptions: IPrecommitNgLintOptions): INgLintCommand {
    return {
        projectName: projectAndItsFiles.project.name,
        options: getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions),
        files: projectAndItsFiles.files
            .map((filePath) => `--files=${filePath}`)
    }
}

export function getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions: IPrecommitNgLintOptions): string[] {
    let ngLintOptions: string[] = []
    if(precommitNgLintOptions.fix) {
        ngLintOptions.push('--fix');
    }
    return ngLintOptions;
}

/**
 * Provides all information to call `ng lint`:
 * ng lint <projectName> <options> <files>
 */
export interface INgLintCommand {
    projectName: string;
    options: string[];
    files: string[];
}
