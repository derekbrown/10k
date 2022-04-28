"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuctionState = exports.AuctionStateInfo = void 0;
const AuctionInfoTypes_1 = require("./AuctionInfoTypes");
var AuctionStateInfo;
(function (AuctionStateInfo) {
    AuctionStateInfo["LOADING"] = "LOADING";
    AuctionStateInfo["NO_PRICING"] = "NO_PRICING";
    AuctionStateInfo["PERPETUAL_BID"] = "PERPETUAL_BID";
    AuctionStateInfo["PERPETUAL_ASK"] = "PERPETUAL_ASK";
    AuctionStateInfo["RESERVE_AUCTION_PENDING"] = "RESERVE_AUCTION_PENDING";
    AuctionStateInfo["RESERVE_AUCTION_ACTIVE"] = "RESERVE_AUCTION_ACTIVE";
    AuctionStateInfo["RESERVE_AUCTION_LAST_15"] = "RESERVE_AUCTION_LAST_15";
    AuctionStateInfo["RESERVE_AUCTION_ENDED"] = "RESERVE_AUCTION_ENDED";
    AuctionStateInfo["RESERVE_AUCTION_FINISHED"] = "RESERVE_AUCTION_FINISHED";
})(AuctionStateInfo = exports.AuctionStateInfo || (exports.AuctionStateInfo = {}));
function getAuctionState(pricing) {
    var _a;
    if (pricing.auctionType === AuctionInfoTypes_1.AuctionType.PERPETUAL) {
        if (pricing.perpetual.ask) {
            return AuctionStateInfo.PERPETUAL_ASK;
        }
        if (!pricing.perpetual.highestBid && ((_a = pricing.reserve) === null || _a === void 0 ? void 0 : _a.previousBids.length)) {
            return AuctionStateInfo.RESERVE_AUCTION_FINISHED;
        }
        if (pricing.perpetual.highestBid) {
            return AuctionStateInfo.PERPETUAL_BID;
        }
        return AuctionStateInfo.NO_PRICING;
    }
    if (pricing.auctionType === AuctionInfoTypes_1.AuctionType.RESERVE && pricing.reserve) {
        if (pricing.reserve.current.likelyHasEnded) {
            return AuctionStateInfo.RESERVE_AUCTION_FINISHED;
        }
        if (pricing.reserve.current.reserveMet) {
            if (pricing.reserve.expectedEndTimestamp &&
                Math.floor(new Date().getTime() / 1000) - 15 * 60 >
                    parseInt(pricing.reserve.expectedEndTimestamp, 10)) {
                return AuctionStateInfo.RESERVE_AUCTION_LAST_15;
            }
            return AuctionStateInfo.RESERVE_AUCTION_ACTIVE;
        }
        return AuctionStateInfo.RESERVE_AUCTION_PENDING;
    }
    return AuctionStateInfo.NO_PRICING;
}
exports.getAuctionState = getAuctionState;
