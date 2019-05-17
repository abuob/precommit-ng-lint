import {IFilesPerProject} from "./files.util";
import {IPrecommitNgLintOptions} from "./getOptionsFromArguments";

export class NgCommandUtil {
    public static getNgLintCommand(projectAndItsFiles: IFilesPerProject, precommitNgLintOptions: IPrecommitNgLintOptions): INgLintCommand {
        return {
            projectName: projectAndItsFiles.project.name,
            options: NgCommandUtil.getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions),
            files: projectAndItsFiles.files
                .map((filePath) => `--files=${filePath}`)
        }
    }

    private static getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions: IPrecommitNgLintOptions): string[] {
        let ngLintOptions: string[] = []
        if (precommitNgLintOptions.fix) {
            ngLintOptions.push('--fix');
        }
        return ngLintOptions;
    }
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
