import * as path from 'path';
import { Component, JsonFile, Project } from 'projen';

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
export class VscodeSettings extends Component {
  constructor(rootProject: Project) {
    super(rootProject);

    new JsonFile(rootProject, '.vscode/settings.json', {
      obj: {
        // Configure linter to use per-package configs
        'eslint.workingDirectories': rootProject.subprojects.map((subproject) => ({
          pattern: path.relative(rootProject.outdir, subproject.outdir),
        })),

        // Recommended settings for TypeScript monorepos
        'typescript.preferences.importModuleSpecifier': 'relative',
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.fixAll.eslint': 'explicit',
        },
      },
    });
  }
}
