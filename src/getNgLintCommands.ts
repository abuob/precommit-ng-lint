import {IFilesPerProject} from "./getStagedFilesPerProject";
import {IPrecommitNgLintOptions} from "./getOptionsFromArguments";

export function getNgLintCommands(filesPerProjectArray: IFilesPerProject[], precommitNgLintOptions: IPrecommitNgLintOptions): INgLintCommands[] {
    return filesPerProjectArray.map((filesPerProject) => {
        return {
            projectName: filesPerProject.project.name,
            options: getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions),
            files: filesPerProject.files
                .map((filePath) => `--files=${filePath}`)
        }
    });
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
export interface INgLintCommands {
    projectName: string;
    options: string[];
    files: string[];
}
