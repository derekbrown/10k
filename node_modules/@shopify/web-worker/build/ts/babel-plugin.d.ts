interface ProcessableImport {
    name: string;
    plain: boolean;
}
export interface Options {
    noop?: boolean;
    packages?: {
        [key: string]: (string | ProcessableImport)[];
    };
}
interface State {
    process: Map<string, ProcessableImport[]>;
    program: import('@babel/traverse').NodePath<import('@babel/types').Program>;
    opts?: Options;
}
export default function workerBabelPlugin({ types: t, template, }: {
    types: typeof import('@babel/types');
    template: typeof import('@babel/template').default;
}): import('@babel/core').PluginObj<State>;
export {};
//# sourceMappingURL=babel-plugin.d.ts.map