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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 2 - Image resize should resolve or reject
// expect resize to throw error
// expect resize to not throw error
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('get the api/images endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(404);
    }));
    it('get the api/images?filename=fjord&height=200&width=200 endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&height=200&width=200');
        expect(response.status).toBe(200);
    }));
    it('get the api/images?filename=fjord&height=0&width=0 endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&height=0&width=0');
        expect(response.text).toBe('Error: Sharp could not process the image');
    }));
});
// clean up after the creating of image during the test
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.unlink(`./images/thumb/fjord_thumb.jpg`);
    }
    catch (err) {
        console.log(err);
    }
}));
