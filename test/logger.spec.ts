import { expect } from "chai";
import { Logger } from '../src/logger'

describe('logger.findFileAndFormat', () => {
    it('should properly format filenames in strings', () => {
        expect(Logger.findFileAndFormat(
            "[ERROR]: /path/to/file.ts[1, 1]: Some Error Message",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: /path/to/__file.ts[1, 1]__: Some Error Message");
        expect(Logger.findFileAndFormat(
            "[ERROR]: \\path\\to\\file.ts[1, 1]: Some Error Message",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: \\path\\to\\__file.ts[1, 1]__: Some Error Message");
        expect(Logger.findFileAndFormat(
            "[ERROR]: \\path\\to\\some.file_with.dots_and.stuff.ts[1, 1]: Some Error Message",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: \\path\\to\\__some.file_with.dots_and.stuff.ts[1, 1]__: Some Error Message");
        expect(Logger.findFileAndFormat(
            "[ERROR]: C:/some/windows/path/to/file.with.dots.ts.ts.ts[10, 100]: Some Error Message containing ./\\ /file.ts",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: C:/some/windows/path/to/__file.with.dots.ts.ts.ts[10, 100]__: Some Error Message containing ./\\ /file.ts");
    });
    it('should not touch the input when there is no fileName in the expected format', () => {
        expect(Logger.findFileAndFormat(
            "[ERROR]: /path/to/file.ts:(1, 1): Some Error Message",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: /path/to/file.ts:(1, 1): Some Error Message");
        expect(Logger.findFileAndFormat(
            "[ERROR]: /path/to/file[1, 1]: Some Error Message",
            (str: string) => `__${str}__`))
            .to.equal("[ERROR]: /path/to/file[1, 1]: Some Error Message");
    });
});
