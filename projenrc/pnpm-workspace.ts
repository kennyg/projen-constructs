import * as path from 'path';
import { Component, Project, YamlFile } from 'projen';

/**
 * Generates pnpm-workspace.yaml from the project's subprojects.
 *
 * This component automatically discovers all subprojects and adds their
 * relative paths to the pnpm workspace configuration.
 */
export class PnpmWorkspace extends Component {
  constructor(rootProject: Project) {
    super(rootProject);

    new YamlFile(rootProject, 'pnpm-workspace.yaml', {
      obj: {
        packages: rootProject.subprojects.map((subproject) =>
          path.relative(rootProject.outdir, subproject.outdir)
        ),
      },
    });
  }
}
