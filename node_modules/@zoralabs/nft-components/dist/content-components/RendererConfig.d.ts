/// <reference types="react" />
import type { ThemeType } from "../context/MediaContext";
export declare enum RenderingPreference {
    INVALID = -1,
    FALLBACK = 0,
    LOW = 1,
    NORMAL = 2,
    PREFERRED = 3,
    PRIORITY = 4
}
export declare type MediaUriType = {
    uri: string;
    type?: string;
};
export declare type RenderRequest = {
    media: {
        content?: MediaUriType;
        image?: MediaUriType;
        animation?: MediaUriType;
    };
    metadata: any;
    renderingContext: "PREVIEW" | "FULL";
};
export declare type RenderComponentType = {
    request: RenderRequest;
    getString: any;
    getStyles: any;
    theme: ThemeType["theme"];
    a11yIdPrefix?: string;
};
export interface RendererConfig {
    getRenderingPreference(request: RenderRequest): RenderingPreference;
    render: React.FunctionComponent<RenderComponentType>;
}
