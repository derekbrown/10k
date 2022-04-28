import { OpenseaNFTDataType } from '../fetcher/AuctionInfoTypes';
export declare type useOpenseaNFTType = {
    currencyLoaded: boolean;
    error?: string;
    data?: OpenseaNFTDataType;
};
declare type OptionsType = {
    refreshInterval?: number;
    initialData?: any;
    loadCurrencyInfo?: boolean;
};
/**
 * Fetches on-chain NFT data and pricing for the given zNFT id
 *
 * @param contractAddress address of the contract
 * @param tokenId id of NFT to fetch blockchain information for
 * @param options SWR flags and an option to load currency info
 * @returns useNFTType hook results include loading, error, and chainNFT data.
 */
export declare function useOpenseaNFT(contractAddress?: string, tokenId?: string, options?: OptionsType): useOpenseaNFTType;
export {};
