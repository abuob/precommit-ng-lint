import {expect} from "chai";
import {IAngularProject} from "../src/ngProject.util";
import {FilesUtil, IFilesPerProject} from "../src/files.util";

describe('FilesUtil.getStagedFilesPerProject', () => {
    it('should separate filePaths by projects', () => {
        const projects: IAngularProject[] = [
            { name: 'project-main', path: 'src' },
            { name: 'project-e2e', path: 'e2e/' },
            { name: 'project-common', path: 'projects/project-common' },
            { name: 'no-match', path: 'projects/no-match' },
        ];

        const filePaths = [
            'src/app/myCode.ts',
            'src/app/myOtherCode.ts',
            'e2e/src/mySpec.e2e.spec.ts',
            'e2e/src/myOtherSpec.e2e.spec.ts',
            'projects/project-common/src/something.ts',
            'projects/project-common/src/anotherPath.ts'
        ];

        const filesPerProject: IFilesPerProject[] = FilesUtil.getStagedFilesPerProject(filePaths, projects);

        expect(filesPerProject).to.have.length(3);

        expect(filesPerProject[0].project.name).to.equal('project-main');
        expect(filesPerProject[0].files).to.have.same.members([
            'src/app/myCode.ts',
            'src/app/myOtherCode.ts'
        ]);

        expect(filesPerProject[1].project.name).to.equal('project-e2e');
        expect(filesPerProject[1].files).to.have.same.members([
            'e2e/src/mySpec.e2e.spec.ts',
            'e2e/src/myOtherSpec.e2e.spec.ts'
        ]);

        expect(filesPerProject[2].project.name).to.equal('project-common');
        expect(filesPerProject[2].files).to.have.same.members([
            'projects/project-common/src/something.ts',
            'projects/project-common/src/anotherPath.ts'
        ]);

    });
});
