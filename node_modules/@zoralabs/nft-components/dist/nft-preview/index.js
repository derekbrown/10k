"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewComponents = exports.NFTPreview = void 0;
const NFTPreview_1 = require("./NFTPreview");
Object.defineProperty(exports, "NFTPreview", { enumerable: true, get: function () { return NFTPreview_1.NFTPreview; } });
const MediaThumbnail_1 = require("./MediaThumbnail");
const PricingComponent_1 = require("./PricingComponent");
const PreviewComponents = {
    MediaThumbnail: MediaThumbnail_1.MediaThumbnail,
    PricingComponent: PricingComponent_1.PricingComponent,
};
exports.PreviewComponents = PreviewComponents;
