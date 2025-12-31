import { Component, typescript } from 'projen';
export interface OxlintOptions {
    /**
     * Enable auto-fix on lint.
     * @default true
     */
    readonly fix?: boolean;
}
/**
 * Configures oxlint for fast, Rust-powered linting.
 *
 * oxlint provides:
 * - 50-100x faster than ESLint
 * - Zero configuration needed
 * - Built-in TypeScript support
 * - Growing rule coverage
 *
 * @example
 * ```ts
 * new Oxlint(project, { fix: true });
 * ```
 */
export declare class Oxlint extends Component {
    constructor(project: typescript.TypeScriptProject, options?: OxlintOptions);
}
//# sourceMappingURL=oxlint.d.ts.map