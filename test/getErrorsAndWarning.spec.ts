import {getErrorsAndWarning} from "../src/getErrorsAndWarnings";
import {expect} from "chai";

describe('getErrorsAndWarning', () => {
    it('should map the rawOutput into an array of errors and warnings', () => {
        const actual = getErrorsAndWarning(
            `Something something
            [ERROR] Something bad happened
            [WARNING] This is not so bad
            
            Random stuff in between
            
            [ERROR] Alert alert!
            [error] lower case errors and warnings are ignored
            This should be ignored as well
            `
        );

        expect(actual).to.have.same.members([
            '[ERROR] Something bad happened',
            '[WARNING] This is not so bad',
            '[ERROR] Alert alert!',
        ]);
    });
});
