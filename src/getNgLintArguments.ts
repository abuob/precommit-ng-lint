import {IFilesPerProject} from "./getStagedFilesPerProject";
import {IPrecommitNgLintOptions} from "./getOptionsFromArguments";

export function getNgLintArguments(filesPerProjectArray: IFilesPerProject[], precommitNgLintOptions: IPrecommitNgLintOptions): INgLintArguments[] {
    return filesPerProjectArray.map((filesPerProject) => {
        return {
            projectName: filesPerProject.project.name,
            options: getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions),
            files: filesPerProject.files
                .map((filePath) => `--files ${filePath}`)
                .join(' ')
        }
    });
}

export function getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions: IPrecommitNgLintOptions): string {
    let ngLintOptions: string[] = []
    if(precommitNgLintOptions.fix) {
        ngLintOptions.push('--fix');
    }
    return ngLintOptions.join(' ');
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
