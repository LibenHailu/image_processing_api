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
const express_1 = __importDefault(require("express"));
const images_1 = require("../../utilities/images");
const images = express_1.default.Router();
const middle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    try {
        // checks if the requested image exists
        yield (0, images_1.getFile)(filename);
        // checks if an image was cached before
        const cacheExists = yield (0, images_1.getCache)(filename, width, height);
        // sends an image if the requested image is in the cache and has the requested meta
        if (cacheExists) {
            // serve image form the cache if it was already proceesed
            res.sendFile(`${filename}_thumb.jpg`, {
                root: './images/thumb/',
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(400);
        res.send(err);
    }
});
images.get('/', middle, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query.filename;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        yield (0, images_1.resize)(filename, width, height);
        // await saveBuffer(filename, buf)
        res.sendFile(`${req.query.filename}_thumb.jpg`, {
            root: './images/thumb/',
        });
    }
    catch (err) {
        res.status(400);
        res.send(err);
    }
}));
exports.default = images;
