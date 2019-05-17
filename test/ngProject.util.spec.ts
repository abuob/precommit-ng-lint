import {expect} from "chai";
import {NgProjectUtil} from "../src/ngProject.util";

describe('NgProjectUtil.getAngularProjects', () => {
    it('should properly fetch all angular projects and their source-paths from the angular.json', () => {
        const angularProjects = NgProjectUtil.getAngularProjects(__dirname);
        expect(angularProjects[0].name).to.equal('project-main');
        expect(angularProjects[0].path).to.equal('src');
        expect(angularProjects[1].name).to.equal('project-e2e');
        expect(angularProjects[1].path).to.equal('e2e/');
    });
});