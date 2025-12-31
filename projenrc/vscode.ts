import * as path from 'path';
import { Component, JsonFile, Project } from 'projen';

/**
 * Generates VSCode settings for monorepo ESLint support.
 *
 * This configures ESLint's working directories so the IDE can
 * find the correct ESLint config for each subproject.
 */
export class VscodeSettings extends Component {
  constructor(rootProject: Project) {
    super(rootProject);

    new JsonFile(rootProject, '.vscode/settings.json', {
      obj: {
        // Configure ESLint to use per-package configs
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
