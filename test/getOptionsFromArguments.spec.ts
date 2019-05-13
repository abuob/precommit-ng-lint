import {expect} from "chai";
import {DEFAULT_OPTIONS, getOptionsFromArguments, parseArgumentToOption} from "../src/getOptionsFromArguments";

describe('parseArgumentToOption', () => {
    it('should properly parse valid arguments and map them into their type', () => {
        expect(parseArgumentToOption('--fix')).to.equal('FIX_TRUE');
        expect(parseArgumentToOption('--fix=true')).to.equal('FIX_TRUE');
        expect(parseArgumentToOption('--fix=false')).to.equal('FIX_FALSE');
    });

    it('should properly map invalid arguments to NONE', () => {
        expect(parseArgumentToOption('--fi')).to.equal('NONE');
        expect(parseArgumentToOption('--fix = true')).to.equal('NONE');
        expect(parseArgumentToOption('--fix=flse')).to.equal('NONE');
        expect(parseArgumentToOption('-fix=false')).to.equal('NONE');
        expect(parseArgumentToOption('fix')).to.equal('NONE');
        expect(parseArgumentToOption('--')).to.equal('NONE');
    });
});

describe('getOptionsFromArguments', () => {
    it('should parse correct arguments to options-object', () => {
        expect(getOptionsFromArguments([])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--fix=true'])).to.deep.equal({...DEFAULT_OPTIONS, fix: true});
        expect(getOptionsFromArguments(['--fix'])).to.deep.equal({...DEFAULT_OPTIONS, fix: true});
        expect(getOptionsFromArguments(['--fix=false'])).to.deep.equal({...DEFAULT_OPTIONS, fix: false});
    });
    it('should parse correct arguments to options-object', () => {
        expect(getOptionsFromArguments(['blah'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['-fix=false'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['-fix'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--fix--fix=true'])).to.deep.equal({...DEFAULT_OPTIONS});
    });
});
