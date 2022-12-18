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
exports.getCache = exports.getFile = exports.resize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
sharp_1.default.cache(false);
// resize processes the image given height and width
const resize = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    // process an image using sharp library
    try {
        yield (0, sharp_1.default)(`./images/full/${filename}.jpg`)
            .resize({
            width: width,
            height: height,
        })
            .toFormat('jpg')
            .toFile(`./images/thumb/${filename}_thumb.jpg`);
    }
    catch (error) {
        throw 'Error: Sharp could not process the image';
    }
});
exports.resize = resize;
// getFile checks if a file exists or not
const getFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const path = `./images/full/${filename}.jpg`;
    const fileExists = yield fs_1.promises
        .stat(path)
        .then(() => true)
        .catch(() => false);
    return new Promise((resolve, reject) => {
        if (!fileExists) {
            reject('Error: can not find the file requested');
        }
        resolve('');
    });
});
exports.getFile = getFile;
// getFile checks if a cache exists or not
const getCache = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const cache_path = `./images/thumb/${filename}_thumb.jpg`;
    const cacheExists = yield fs_1.promises
        .stat(cache_path)
        .then(() => true)
        .catch(() => false);
    if (!cacheExists) {
        return false;
    }
    const meta = yield (0, sharp_1.default)(`./images/thumb/${filename}_thumb.jpg`).metadata();
    const isCached = meta.width == width && meta.height == height;
    return new Promise((resolve, reject) => {
        if (isCached) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    });
});
exports.getCache = getCache;
