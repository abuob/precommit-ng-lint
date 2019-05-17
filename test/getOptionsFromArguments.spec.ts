import {expect} from "chai";
import {DEFAULT_OPTIONS, getOptionsFromArguments, parseArgumentToOption} from "../src/getOptionsFromArguments";

describe('parseArgumentToOption', () => {
    it('should properly parse valid arguments and map them into their type', () => {
        expect(parseArgumentToOption('--fix')).to.deep.equal({argType: 'FIX', argValue: true});
        expect(parseArgumentToOption('--fix=true')).to.deep.equal({argType: 'FIX', argValue: true});
        expect(parseArgumentToOption('--fix=false')).to.deep.equal({argType: 'FIX', argValue: false});
        expect(parseArgumentToOption('--angularConfig=angular.json')).to.deep.equal({
            argType: 'ANGULAR_CONFIG',
            argValue: 'angular.json'
        });
        expect(parseArgumentToOption('--angularConfig=something.json')).to.deep.equal({
            argType: 'ANGULAR_CONFIG',
            argValue: 'something.json'
        });
    });

    it('should properly map invalid arguments to INVALID', () => {
        expect(parseArgumentToOption('--fi')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--fix = true')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--fix=flse')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('-fix=false')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('fix')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--angularConfig=')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--angularConfig=angular.js')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('--angularConfig=.json')).to.deep.equal({argType: 'INVALID', argValue: null});
        expect(parseArgumentToOption('---angularConfig=angularTestConfig.json')).to.deep.equal({argType: 'INVALID', argValue: null});
    });
});

describe('getOptionsFromArguments', () => {
    it('should parse correct arguments to options-object for single arguments', () => {
        expect(getOptionsFromArguments([])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--fix=true'])).to.deep.equal({...DEFAULT_OPTIONS, fix: true});
        expect(getOptionsFromArguments(['--fix'])).to.deep.equal({...DEFAULT_OPTIONS, fix: true});
        expect(getOptionsFromArguments(['--fix=false'])).to.deep.equal({...DEFAULT_OPTIONS, fix: false});
        expect(getOptionsFromArguments(['--angularConfig=angular.json'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--angularConfig=angularTestConfig.json'])).to.deep.equal({
            ...DEFAULT_OPTIONS,
            angularConfigName: 'angularTestConfig.json'
        });
    });
    it('should parse correct arguments to options-object for multiple arguments', () => {
        expect(getOptionsFromArguments(['--fix=false', '--angularConfig=angularTestConfig.json'])).to.deep.equal({
            ...DEFAULT_OPTIONS,
            fix: false,
            angularConfigName: 'angularTestConfig.json'
        });
    });
    it('should ignore faulty arguments', () => {
        expect(getOptionsFromArguments(['blah'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['-fix=false'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['-fix'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--fix--fix=true'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--angularConfig=.json'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--angularConfig=angular.js'])).to.deep.equal({...DEFAULT_OPTIONS});
        expect(getOptionsFromArguments(['--angularConfig=something'])).to.deep.equal({...DEFAULT_OPTIONS});
    });
    it('should accept correct arguments and ignore faulty ones', () => {
        expect(getOptionsFromArguments(['--fix=true', '--angularConfig=.json'])).to.deep.equal({
            ...DEFAULT_OPTIONS,
            fix: true
        });
        expect(getOptionsFromArguments(['--fixx', '--angularConfig=angularTestConfig.json'])).to.deep.equal({
            ...DEFAULT_OPTIONS,
            angularConfigName: 'angularTestConfig.json'
        });
    });
});
