/// <reference types="react" />
declare type MetadataIsh = {
    mimeType: string;
    name: string;
    description: string;
    animation_url?: string;
    image?: string;
};
declare type MediaObjectProps = {
    contentURI?: string;
    a11yIdPrefix?: string;
    metadata: MetadataIsh;
    isFullPage?: boolean;
};
export declare const MediaObject: ({ contentURI, metadata, a11yIdPrefix, isFullPage, }: MediaObjectProps) => JSX.Element;
export {};
