"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unknown = exports.Model = exports.Audio = exports.Video = exports.Image = exports.HTML = exports.Text = exports.MediaRendererDefaults = void 0;
const Audio_1 = require("./Audio");
Object.defineProperty(exports, "Audio", { enumerable: true, get: function () { return Audio_1.Audio; } });
const HTML_1 = require("./HTML");
Object.defineProperty(exports, "HTML", { enumerable: true, get: function () { return HTML_1.HTML; } });
const Image_1 = require("./Image");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return Image_1.Image; } });
const Model_1 = require("./Model");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return Model_1.Model; } });
const Text_1 = require("./Text");
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return Text_1.Text; } });
const Unknown_1 = require("./Unknown");
Object.defineProperty(exports, "Unknown", { enumerable: true, get: function () { return Unknown_1.Unknown; } });
const Video_1 = require("./Video");
Object.defineProperty(exports, "Video", { enumerable: true, get: function () { return Video_1.Video; } });
exports.MediaRendererDefaults = [
    Model_1.Model,
    Audio_1.Audio,
    Text_1.Text,
    HTML_1.HTML,
    Image_1.Image,
    Video_1.Video,
    Unknown_1.Unknown,
];
