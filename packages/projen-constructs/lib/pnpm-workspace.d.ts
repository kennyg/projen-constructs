import { Component, Project } from 'projen';
/**
 * Generates pnpm-workspace.yaml from the project's subprojects.
 *
 * This component automatically discovers all subprojects and adds their
 * relative paths to the pnpm workspace configuration.
 *
 * @example
 * ```ts
 * new PnpmWorkspace(project);
 * ```
 */
export declare class PnpmWorkspace extends Component {
    constructor(rootProject: Project);
}
//# sourceMappingURL=pnpm-workspace.d.ts.map