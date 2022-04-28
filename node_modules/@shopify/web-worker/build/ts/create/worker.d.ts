import { Endpoint, MessageEndpoint } from '@shopify/rpc';
import { FileOrModuleResolver } from './utilities';
export interface CreateWorkerOptions {
    createMessenger?(url: URL): MessageEndpoint;
}
export interface WorkerCreator<T> {
    readonly url?: URL;
    (options?: CreateWorkerOptions): Endpoint<T>['call'];
}
export declare function createWorkerFactory<T = unknown>(script: FileOrModuleResolver<T>): WorkerCreator<T>;
export declare function expose(caller: any, api: {
    [key: string]: Function | undefined;
}): void | undefined;
export declare function terminate(caller: any): void;
export declare function getEndpoint(caller: any): Endpoint<any> | undefined;
//# sourceMappingURL=worker.d.ts.map