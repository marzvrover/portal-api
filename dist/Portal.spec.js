"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Portal_1 = require("./Portal");
const Settings = __importStar(require("./Settings"));
describe('Settings in Portal namespace', () => {
    const keys = Object.keys(Settings);
    for (let key of keys) {
        test(key, () => {
            // @ts-ignore
            expect(Portal_1.Portal[key]).toBe(Settings[key]);
        });
    }
});
//# sourceMappingURL=Portal.spec.js.map