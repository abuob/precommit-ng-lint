import {IAngularProject} from "./getAngularProjects";

export function getStagedFilesPerProject(filePaths: string[], projects: IAngularProject[]): IFilesPerProject[] {
    return projects.map((project: IAngularProject) => {
        return {
            project,
            files: filterFilesByProjectPath(project.path, filePaths)
        }
    }).filter((filesPerProject) => filesPerProject.files.length > 0);
}

function filterFilesByProjectPath(projectPath: string, filePaths: string[]): string[] {
    return filePaths.filter((filePath) => new RegExp('^' + projectPath + '.*').test(filePath));
}

export interface IFilesPerProject {
    project: IAngularProject,
    files: string[]
}
