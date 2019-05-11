const findParentDir = require('find-parent-dir');

export function getAngularConfig(basePath: string): IAngularConfig {
    const angularConfigPath = findParentDir.sync(basePath, 'angular.json');
    const angularConfig: IAngularConfig = require(angularConfigPath + '/angular.json');
    return angularConfig;
}

function getConfigPath(projectDescription: any): string {
    return (projectDescription.root ? projectDescription.root : "")
        + (projectDescription.sourceRoot ? projectDescription.sourceRoot : "");
}

export function getAngularProjects(basePath: string): IAngularProject[] {
    const angularConfig = getAngularConfig(basePath);
    const projects: string[] = Object.keys(angularConfig.projects);
    return projects.map((project) => {
        return {
            name: project,
            path: getConfigPath(angularConfig.projects[project])
        };
    });
}

export interface IAngularConfig {
    newProjectRoot: string;
    projects: any;
}

export interface IAngularProject {
    name: string;
    path: string;
}
