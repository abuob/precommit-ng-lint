import {expect} from "chai";
import {filterByFileExtension} from "../src/filterByFileExtension";

describe('filterByFileExtension', () => {
    it('should only return files that have one of the given extensions', () => {
        expect(filterByFileExtension(['src/blah.ts', 'package.json', '.gitignore', 'e2e/mySpec.e2e.ts'], ['ts']))
            .to.have.same.members(['src/blah.ts', 'e2e/mySpec.e2e.ts']);

        expect(filterByFileExtension(['src/blah.ts', 'package.json', '.gitignore', 'e2e/mySpec.e2e.ts'], ['json']))
            .to.have.same.members(['package.json']);

        expect(filterByFileExtension(['src/blah.ts', 'package.json', '.gitignore', 'e2e/mySpec.e2e.ts'], ['ts', 'json']))
            .to.have.same.members(['src/blah.ts', 'e2e/mySpec.e2e.ts', 'package.json']);
    });
});
