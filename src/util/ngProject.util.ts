const findParentDir = require('find-parent-dir');

export class NgProjectUtil {
    public static getAngularProjects(basePath: string): IAngularProject[] {
        const angularConfig = NgProjectUtil.getAngularConfig(basePath);
        const projectNames: string[] = Object.keys(angularConfig.projects);
        return projectNames.map((projectName) => {
            return {
                name: projectName,
                path: NgProjectUtil.getConfigPath(angularConfig.projects[projectName])
            };
        });
    }

    private static getConfigPath(projectDescription: IAngularJsonProject): string {
        return (projectDescription.root ? projectDescription.root : "")
            + (projectDescription.sourceRoot ? projectDescription.sourceRoot : "");
    }

    private static getAngularConfig(basePath: string): IAngularConfig {
        const angularConfigPath = findParentDir.sync(basePath, 'angular.json');
        const angularConfig: IAngularConfig = require(angularConfigPath + '/angular.json');
        return angularConfig;
    }
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
