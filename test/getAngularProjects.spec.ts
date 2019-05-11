import {expect} from "chai";
import {getAngularProjects} from "../src/getAngularProjects";

describe('getAngularProjects', () => {
    it('should properly fetch all angular projects and their source-paths from the angular.json', () => {
        const angularProjects = getAngularProjects(__dirname);
        expect(angularProjects[0].name).to.equal('project-main');
        expect(angularProjects[0].path).to.equal('src');
        expect(angularProjects[1].name).to.equal('project-e2e');
        expect(angularProjects[1].path).to.equal('e2e/');
    });
});
