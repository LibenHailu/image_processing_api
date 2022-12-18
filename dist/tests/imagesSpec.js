"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("../utilities/images");
describe('Test resize image function', () => {
    it('expect resize not to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, images_1.resize)('fjord', 200, 200);
        expect(response).toBeUndefined();
    }));
    it('expect resize to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, images_1.resize)('fjord', 0, 0)).toBeRejectedWith('Error: Sharp could not process the image');
    }));
});
describe('Test getFile  function', () => {
    it('expect getFile not to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, images_1.getFile)('fjord')).toBeResolvedTo('');
    }));
    it('expect getFile to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, images_1.getFile)('')).toBeRejectedWith('Error: can not find the file requested');
    }));
});
describe('Test getCache  function', () => {
    it('expect getCache not to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, images_1.resize)('fjord', 200, 200);
        yield expectAsync((0, images_1.getCache)('fjord', 200, 200)).toBeResolvedTo(true);
    }));
    it('expect getCache to throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, images_1.resize)('fjord', 200, 200);
        yield expectAsync((0, images_1.getCache)('fjord', 200, 100)).toBeResolvedTo(false);
    }));
});
