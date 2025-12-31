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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsY0FBYyxxQkFBcUIsQ0FBQztBQUNwQyxjQUFjLFNBQVMsQ0FBQztBQUN4QixjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kZXJuIHByb2plbiBjb21wb25lbnRzIGZvciBFU00tZmlyc3QgVHlwZVNjcmlwdCBtb25vcmVwb3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBQbnBtV29ya3NwYWNlLCBOeCwgVml0ZXN0LCBPeGxpbnQsIFZzY29kZVNldHRpbmdzIH0gZnJvbSAnQG15LW1vbm9yZXBvL3Byb2plbi1jb25zdHJ1Y3RzJztcbiAqXG4gKiBjb25zdCBwcm9qZWN0ID0gbmV3IHR5cGVzY3JpcHQuVHlwZVNjcmlwdFByb2plY3QoeyAuLi4gfSk7XG4gKlxuICogbmV3IFBucG1Xb3Jrc3BhY2UocHJvamVjdCk7XG4gKiBuZXcgTngocHJvamVjdCk7XG4gKiBuZXcgVml0ZXN0KHByb2plY3QpO1xuICogbmV3IE94bGludChwcm9qZWN0KTtcbiAqIG5ldyBWc2NvZGVTZXR0aW5ncyhwcm9qZWN0KTtcbiAqIGBgYFxuICpcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vcG5wbS13b3Jrc3BhY2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9ueC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3ZzY29kZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3ZpdGVzdC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL294bGludC5qcyc7XG4iXX0=