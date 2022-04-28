import { ForwardedRef, RefObject } from "react";
/**
 * Helper function to sync forwardRefs to object refs.
 */
export declare function useSyncRef<T>(source: RefObject<T>, target: ForwardedRef<T>): void;
