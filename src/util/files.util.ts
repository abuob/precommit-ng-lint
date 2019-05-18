import { IAngularProject } from './ngProject.util';

export class FilesUtil {
    public static getStagedFilesPerProject(filePaths: string[], projects: IAngularProject[]): IFilesPerProject[] {
        return projects
            .map((project: IAngularProject) => {
                return {
                    files: FilesUtil.filterFilesByProjectPath(project.path, filePaths),
                    project
                };
            })
            .filter(filesPerProject => filesPerProject.files.length > 0);
    }

    private static filterFilesByProjectPath(projectPath: string, filePaths: string[]): string[] {
        return filePaths.filter(filePath => new RegExp('^' + projectPath + '.*').test(filePath));
    }
}

export interface IFilesPerProject {
    project: IAngularProject;
    files: string[];
}
