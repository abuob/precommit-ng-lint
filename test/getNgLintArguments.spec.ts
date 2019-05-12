import {getNgLintArguments, INgLintArguments} from "../src/getNgLintArguments";
import {expect} from "chai";

describe('getNgLintArguments', () => {
   it("should generate an object that contains everything that is needed to execute 'ng lint'", () => {
       const actual: INgLintArguments[] = getNgLintArguments([
           {project: {name: 'project-1', path: ''}, files: ['file1-1.ts', 'file1-2.ts']},
           {project: {name: 'project-2', path: ''}, files: ['file2-1.ts', 'file2-2.ts']},
       ]);

       expect(actual).to.have.length(2);

       expect(actual[0].projectName).to.equal('project-1');
       expect(actual[0].files).to.equal('--files file1-1.ts --files file1-2.ts');

       expect(actual[1].projectName).to.equal('project-2');
       expect(actual[1].files).to.equal('--files file2-1.ts --files file2-2.ts');
   });
});
