import React from 'react';
import { NetworkIDs } from '../constants/networks';
import { MediaFetchAgent } from '../fetcher/MediaFetchAgent';
export declare type FetchContext = InstanceType<typeof MediaFetchAgent>;
export declare const defaultFetchAgent: MediaFetchAgent;
export declare const NFTFetchContext: React.Context<MediaFetchAgent>;
declare type NFTFetchConfigurationProps = {
    networkId: NetworkIDs;
    children: React.ReactNode;
};
export declare const NFTFetchConfiguration: ({ networkId, children, }: NFTFetchConfigurationProps) => JSX.Element;
export {};
