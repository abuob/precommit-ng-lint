import {IPrecommitNgLintOptions} from "../getOptionsFromArguments";

const findParentDir = require('find-parent-dir');

export class NgProjectUtil {
    public static getAngularProjects(basePath: string, options: IPrecommitNgLintOptions): IAngularProject[] {
        const angularConfig = NgProjectUtil.getAngularConfig(basePath, options.angularConfigName);
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

    private static getAngularConfig(basePath: string, angularConfigFileName: string): IAngularConfig {
        const angularConfigPath = findParentDir.sync(basePath, angularConfigFileName);
        const angularConfig: IAngularConfig = require(`${angularConfigPath}/${angularConfigFileName}`);
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
