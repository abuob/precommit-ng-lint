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
