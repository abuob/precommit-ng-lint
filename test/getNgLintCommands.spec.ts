import {getNgLintCommands, INgLintCommands} from "../src/getNgLintCommands";
import {expect} from "chai";
import {DEFAULT_OPTIONS} from "../src/getOptionsFromArguments";

describe('getNgLintCommands', () => {
   it("should generate an object that contains everything that is needed to execute 'ng lint'", () => {
       const actual: INgLintCommands[] = getNgLintCommands([
           {project: {name: 'project-1', path: ''}, files: ['file1-1.ts', 'file1-2.ts']},
           {project: {name: 'project-2', path: ''}, files: ['file2-1.ts', 'file2-2.ts']},
       ], DEFAULT_OPTIONS);

       expect(actual).to.have.length(2);

       expect(actual[0].projectName).to.equal('project-1');
       expect(actual[0].files).to.have.same.members(['--files=file1-1.ts', '--files=file1-2.ts']);
       expect(actual[0].options).to.have.same.members([]);

       expect(actual[1].projectName).to.equal('project-2');
       expect(actual[1].files).to.have.same.members(['--files=file2-1.ts', '--files=file2-2.ts']);
       expect(actual[1].options).to.have.same.members([]);
   });

   it("should properly set options", () => {
       const actual: INgLintCommands[] = getNgLintCommands([
           {project: {name: 'project-1', path: ''}, files: ['file1-1.ts', 'file1-2.ts']},
           {project: {name: 'project-2', path: ''}, files: ['file2-1.ts', 'file2-2.ts']},
       ], {...DEFAULT_OPTIONS, fix: true});

       expect(actual).to.have.length(2);

       expect(actual[0].projectName).to.equal('project-1');
       expect(actual[0].files).to.have.same.members(['--files=file1-1.ts', '--files=file1-2.ts']);
       expect(actual[0].options).to.have.same.members(['--fix']);

       expect(actual[1].projectName).to.equal('project-2');
       expect(actual[1].files).to.have.same.members(['--files=file2-1.ts', '--files=file2-2.ts']);
       expect(actual[1].options).to.have.same.members(['--fix']);
   });
});
