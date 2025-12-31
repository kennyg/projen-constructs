import { Component, typescript } from 'projen';
export interface NxOptions {
    /**
     * Operations that can be cached by NX.
     * @default ['build', 'test']
     */
    readonly cacheableOperations?: string[];
    /**
     * The default base branch for affected commands.
     * @default 'origin/main'
     */
    readonly defaultBase?: string;
}
/**
 * Configures NX for monorepo build orchestration and caching.
 *
 * NX provides:
 * - Intelligent build caching (skip unchanged packages)
 * - Dependency-aware task execution
 * - `nx affected` commands for CI optimization
 *
 * @example
 * ```ts
 * new Nx(project, {
 *   cacheableOperations: ['build', 'test', 'lint'],
 * });
 * ```
 */
export declare class Nx extends Component {
    constructor(rootProject: typescript.TypeScriptProject, options?: NxOptions);
}
//# sourceMappingURL=nx.d.ts.map