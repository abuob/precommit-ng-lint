import { IPrecommitNgLintOptions } from '../getOptionsFromArguments';
import { IFilesPerProject } from './files.util';

export class NgCommandUtil {
    public static getNgLintCommand(projectAndItsFiles: IFilesPerProject, precommitNgLintOptions: IPrecommitNgLintOptions): INgLintCommand {
        return {
            files: projectAndItsFiles.files.map(filePath => `--files=${filePath}`),
            options: NgCommandUtil.getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions),
            projectName: projectAndItsFiles.project.name
        };
    }

    private static getNgLintOptionsFromPrecommitNgLintOptions(precommitNgLintOptions: IPrecommitNgLintOptions): string[] {
        const ngLintOptions: string[] = [];
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
