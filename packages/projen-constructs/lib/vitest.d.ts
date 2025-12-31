import { Component, typescript } from 'projen';
export interface VitestOptions {
    /**
     * Enable coverage reporting.
     * @default true
     */
    readonly coverage?: boolean;
    /**
     * Coverage provider.
     * @default 'v8'
     */
    readonly coverageProvider?: 'v8' | 'istanbul';
}
/**
 * Configures Vitest for fast, ESM-native testing.
 *
 * Vitest provides:
 * - Native ESM support
 * - Fast execution with Vite's transform pipeline
 * - Jest-compatible API
 * - Built-in TypeScript support
 *
 * @example
 * ```ts
 * new Vitest(project, {
 *   coverage: true,
 *   coverageProvider: 'v8',
 * });
 * ```
 */
export declare class Vitest extends Component {
    constructor(project: typescript.TypeScriptProject, options?: VitestOptions);
}
//# sourceMappingURL=vitest.d.ts.map