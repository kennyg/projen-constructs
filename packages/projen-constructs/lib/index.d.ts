/**
 * Modern projen components for ESM-first TypeScript monorepos.
 *
 * @example
 * ```ts
 * import { PnpmWorkspace, Nx, Vitest, Oxlint, VscodeSettings } from '@my-monorepo/projen-constructs';
 *
 * const project = new typescript.TypeScriptProject({ ... });
 *
 * new PnpmWorkspace(project);
 * new Nx(project);
 * new Vitest(project);
 * new Oxlint(project);
 * new VscodeSettings(project);
 * ```
 *
 * @packageDocumentation
 */
export * from './pnpm-workspace.js';
export * from './nx.js';
export * from './vscode.js';
export * from './vitest.js';
export * from './oxlint.js';
//# sourceMappingURL=index.d.ts.map