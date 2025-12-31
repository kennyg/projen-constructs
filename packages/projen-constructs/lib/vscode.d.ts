import { Component, Project } from 'projen';
/**
 * Generates VSCode settings for monorepo support.
 *
 * This configures:
 * - ESLint/oxlint working directories per subproject
 * - TypeScript import preferences
 * - Format on save
 *
 * @example
 * ```ts
 * new VscodeSettings(project);
 * ```
 */
export declare class VscodeSettings extends Component {
    constructor(rootProject: Project);
}
//# sourceMappingURL=vscode.d.ts.map