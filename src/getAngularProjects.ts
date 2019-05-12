const findParentDir = require('find-parent-dir');

function getAngularConfig(basePath: string): IAngularConfig {
    const angularConfigPath = findParentDir.sync(basePath, 'angular.json');
    const angularConfig: IAngularConfig = require(angularConfigPath + '/angular.json');
    return angularConfig;
}

function getConfigPath(projectDescription: IAngularJsonProject): string {
    return (projectDescription.root ? projectDescription.root : "")
        + (projectDescription.sourceRoot ? projectDescription.sourceRoot : "");
}

export function getAngularProjects(basePath: string): IAngularProject[] {
    const angularConfig = getAngularConfig(basePath);
    const projectNames: string[] = Object.keys(angularConfig.projects);
    return projectNames.map((projectName) => {
        return {
            name: projectName,
            path: getConfigPath(angularConfig.projects[projectName])
        };
    });
}

export interface IAngularConfig {
    newProjectRoot: string;
    projects: {
        [key: string]: IAngularJsonProject
    };
}

interface IAngularJsonProject {
    root?: string;
    sourceRoot?: string;
    projectType: string;
    schematics: any;
    architect: any;
}

export interface IAngularProject {
    name: string;
    path: string;
}
