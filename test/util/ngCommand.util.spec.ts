import {INgLintCommand, NgCommandUtil} from "../../src/util/ngCommand.util";
import {expect} from "chai";
import {DEFAULT_OPTIONS} from "../../src/getOptionsFromArguments";

describe('NgCommandUtil.getNgLintCommand', () => {
   it("should generate an object that contains everything that is needed to execute 'ng lint'", () => {
       const actual: INgLintCommand = NgCommandUtil.getNgLintCommand(
           {project: {name: 'project-1', path: ''}, files: ['file1-1.ts', 'file1-2.ts']}
           , DEFAULT_OPTIONS);

       expect(actual.projectName).to.equal('project-1');
       expect(actual.files).to.have.same.members(['--files=file1-1.ts', '--files=file1-2.ts']);
       expect(actual.options).to.have.same.members([]);
   });

   it("should properly set options", () => {
       const actual: INgLintCommand = NgCommandUtil.getNgLintCommand(
           {project: {name: 'project-2', path: ''}, files: ['file2-1.ts', 'file2-2.ts']}
           , {...DEFAULT_OPTIONS, fix: true});

       expect(actual.projectName).to.equal('project-2');
       expect(actual.files).to.have.same.members(['--files=file2-1.ts', '--files=file2-2.ts']);
       expect(actual.options).to.have.same.members(['--fix']);
   });
});
