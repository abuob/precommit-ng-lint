const findParentDir = require('find-parent-dir');
const pify = require('pify');

export function getAngularConfig(basePath: string): Promise<IAngularConfig | null> {
    // return pify(findParentDir)(basePath, 'angular.json').then((err: any, dir: string) => {
    //     const angularConfig: IAngularConfig | null = require(dir + '/angular.json');
    //     return angularConfig;
    // });
    findParentDir(basePath, 'angular.json', (err: any, dir: string) => {
            const angularConfig: IAngularConfig | null = require(dir + '/angular.json');
            console.log(angularConfig);
    });
    return Promise.resolve(null);
}

export function getAngularProjects(basePath: string): IAngularProject[] {
    const angularConfig = getAngularConfig(basePath);
    return [];
}

export interface IAngularConfig {
    newProjectRoot: string;
    projects: any;
}

export interface IAngularProject {
    name: string;
    path: string;
}
