"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrenciesInUse = void 0;
function getCurrenciesInUse(nftPricing) {
    var _a, _b, _c, _d;
    const hasReserve = nftPricing.reserve;
    if (hasReserve) {
        const auctionCurrencyId = (_a = nftPricing.reserve) === null || _a === void 0 ? void 0 : _a.auctionCurrency.id;
        if (auctionCurrencyId) {
            return [auctionCurrencyId];
        }
    }
    const bids = ((_c = (_b = nftPricing.perpetual) === null || _b === void 0 ? void 0 : _b.bids) === null || _c === void 0 ? void 0 : _c.map((bid) => bid.pricing.currency.id)) || [];
    const ask = (_d = nftPricing.perpetual.ask) === null || _d === void 0 ? void 0 : _d.pricing.currency.id;
    if (ask) {
        return [...bids, ask];
    }
    return bids;
}
exports.getCurrenciesInUse = getCurrenciesInUse;
